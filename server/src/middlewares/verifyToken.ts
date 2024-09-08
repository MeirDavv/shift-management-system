import jwt,{JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import {JwtPayload as CustomJwtPayload} from '../types/JwtPayload';
import tokenController from '../controllers/tokenController';
import { CustomRequest } from '../types/customRequest';


dotenv.config();

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET){
    throw new Error("Access Token can't be accessed")
}

const verifyToken = (req:CustomRequest,res:Response,next:NextFunction) =>{
    const accessToken = req.cookies.token || req.headers["authorization"]?.split(' ')[1]; // Assuming Bearer token format
    const refreshToken = req.cookies.refresh;
    console.log("Refresh token:", refreshToken)

    console.log("Access Token from Cookies or Header: ", accessToken);

    if(!accessToken) {
        if (refreshToken){
            console.log("Access token missing, attempting to refresh");
            return tokenController.refreshAccessToken(req,res);
        }
        return res.status(401).json({message:"Unauthorized"});
    }

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        if(err){
            console.log("JWT Error: ", err);
            if (err instanceof TokenExpiredError){
                // Call the refreshAccessToken function when access token is expired
                return tokenController.refreshAccessToken(req,res);
        } else{
            console.log("JWT Error other than expiration: ", err); // Log other errors
            return res.status(403).json({message:'Forbidden', error:err.message});
        }
    }

        if(typeof decode === 'object' && decode!=null){
            const {userid,first_name,last_name,email,role_id} = decode as JwtPayload;
            req.userid = userid;
            req.first_name = first_name;
            req.last_name = last_name;
            req.email = email;
            req.role_id = role_id;
            req.token = accessToken;
        }
        next();
    });
};


export default verifyToken;