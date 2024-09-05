import jwt,{JwtPayload, TokenExpiredError} from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import {JwtPayload as CustomJwtPayload} from '../types/JwtPayload';

dotenv.config();

const {ACCESS_TOKEN_SECRET} = process.env;

if (!ACCESS_TOKEN_SECRET){
    throw new Error("Access Token can't be accessed")
}

const verifyToken = (req:Request,res:Response,next:NextFunction) =>{
    const accessToken = req.cookies.token || req.headers["authorization"]?.split(' ')[1]; // Assuming Bearer token format

    //console.log("accessToken => ", accessToken);

    if(!accessToken) return res.status(401).json({message:"unauthorized"});

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err: jwt.VerifyErrors | null, decode: string | JwtPayload | undefined) => {
        if(err){
            if (err instanceof TokenExpiredError){
                return res.status(401).json({message:"Token expired", error: err.message});
            }
            return res.status(403).json({message:"forbidden", error:err.message});
        }

        if(typeof decode === 'object' && decode!=null){
            const {userid,first_name,last_name,email,role_id} = decode as CustomJwtPayload;
            req.userid = userid;
            req.first_name = first_name;
            req.last_name = last_name;
            req.email = email;
            req.role_id = role_id;
        }
        next();
    });
};


export default verifyToken;