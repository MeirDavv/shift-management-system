import { Request, Response } from 'express';
import tokenModel from '../models/tokenModel';
import jwt from "jsonwebtoken";


const getJwtForEmployee = async (req:Request, res: Response) =>{
    const {employee_id} = req.params;
    const requestingUserId = req.userid;

    if (parseInt(employee_id,10) !== requestingUserId){
        return res.status(403).json({message:'Forbidden. You do not have access to this token.'})
    }

    try{
        const tokenData = await tokenModel.getTokenByEmployeeId(requestingUserId);

        if(tokenData){
            res.status(200).json({accessToken:tokenData.access_token, refreshToken: tokenData.refresh_token});
        }else{
            res.status(404).json({ message: 'No token found for this employee.' });
        }
    } catch (error) {
        console.error('Error retrieving JWT:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

const refreshAccessToken = async (req: Request, res: Response) => {
    const {REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET} = process.env;

    if (!REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_SECRET){
        return res.status(500).json({message: 'Token secrets are not defined'});
    }

    const refreshToken = req.cookies.refresh;

    if (!refreshToken){
        return res.status(403).json({message: "No refresh token provided."})
    }

    try{
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken,REFRESH_TOKEN_SECRET) as jwt.JwtPayload;

        const {userid, first_name, last_name,email, role_id} = decoded;

        // Check if the refresh token is in the database
        const tokenRecord = await tokenModel.getTokenByEmployeeId(userid);

        if (!tokenRecord || tokenRecord.refresh_token!= refreshToken){
            return res.status(403).json({message: "Invalid refresh token"});
        }
        
        // Generate a new access token
        const newAccessToken = jwt.sign(
            {userid, first_name, last_name,email,role_id},
            ACCESS_TOKEN_SECRET,
            {expiresIn: '10m'}
        );

        const accessTokenExpiresAt = new Date(Date.now() + 10*60*1000); // 10 minutes

        // Update the access token in the database
        await tokenModel.updateAccessToken(userid,newAccessToken, accessTokenExpiresAt);

        // Set the new access token in cookies
        res.cookie("token", newAccessToken, {
            httpOnly:true,
            maxAge: 5* 1000 // 5 seconds 
        });

        res.json({
            message:"New access token generated successfully",
            accessToken:newAccessToken
        });
    } catch(error) {
        console.log("Error verifying refresh token:",error);
        res.status(403).json({message: "Invalid refresh token"});
    }
};

export default {getJwtForEmployee, refreshAccessToken};