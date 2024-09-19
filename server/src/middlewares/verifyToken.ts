import jwt,{JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import {JwtPayload as CustomJwtPayload} from '../types/JwtPayload';
import tokenController from '../controllers/tokenController';
import { CustomRequest } from '../types/customRequest';
import asyncLocalStorage from '../context/asyncLocalStorage';



dotenv.config();

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET){
    throw new Error("Access Token can't be accessed")
}

const verifyToken = async (req:CustomRequest,res:Response,next:NextFunction) =>{
    try{
        const accessToken = req.cookies.token || req.headers["authorization"]?.split(' ')[1]; // Assuming Bearer token format
        const refreshToken = req.cookies.refresh;

        console.log("Refresh token:", refreshToken)
        console.log("Access Token from Cookies or Header: ", accessToken);

        if(!accessToken) {
            if (refreshToken){
                console.log("Access token missing, attempting to refresh");
                
                // Await the refresh process to complete before moving forward
                const success = await tokenController.refreshAccessToken(req,res);

                if(success){
                    console.log("Access token refreshed successfully");
                    return next();
                } else {
                    return res.status(401).json({message: "Unauthorized"})
                }
            }
            return res.status(401).json({message:"Unauthorized"});
        }

        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decode: string | JwtPayload | undefined) => {
            if(err){
                console.log("JWT Error: ", err);

                if (err instanceof TokenExpiredError){
                    console.log("Access token expired, attempting to refresh");

                    // Attempt to refresh the access token if expired and handle as a promise
                    tokenController.refreshAccessToken(req,res).then(success => {
                        if(success){
                            return next(); // Refresh successful, move forward
                        }
                        return res.status(403).json({message:'Forbidden'});
                    }).catch(refreshErr => {
                        console.error("Error during token refresh:",refreshErr);
                        return res.status(403).json({message:'Forbidden', error:refreshErr.message});
                    });
            } else{
                return res.status(403).json({message:'Forbidden', error:err.message});
            }
        }
        else{
            if(typeof decode === 'object' && decode!=null){
                const {userid,first_name,last_name,organization_id,email,role_id} = decode as JwtPayload;

                // Ensure organization_id is defined and is a number
                if (typeof organization_id !== 'number') {
                    return res.status(400).json({ message: 'Invalid or missing organization_id' });
                }


                req.userid = userid;
                req.first_name = first_name;
                req.last_name = last_name;
                req.organization_id = organization_id;
                req.email = email;
                req.role_id = role_id;
                req.token = accessToken;

                console.log("Decoded User ID:", req.userid);  // Log User ID

                // Use asyncLocalStorage to store the organization_id for the duration of the request
                asyncLocalStorage.run({organization_id:req.organization_id},()=>{
                next(); //Token is verified, move forward
            })
            }
            else {
                return res.status(403).json({ message: 'Forbidden, invalid token structure' });
            }
        }     
        });
    }catch(error){
        console.error("Error in token verification middleware", error);
        res.status(500).json({message: "Internal server error"});
    }
};


export default verifyToken;