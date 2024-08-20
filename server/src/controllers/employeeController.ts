import employeeModel from "../models/employeeModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import dotenv from "dotenv";
import { Employee } from "../types/Employee";
import tokenModel from "../models/tokenModel";


dotenv.config();

const isPasswordMatch = (loginPassword:string, userPassword:string ):Promise<boolean> => {
    return bcrypt.compare(loginPassword,userPassword);
}

const registerUser= async (req:Request,res:Response): Promise<void> => {
    const user : Employee = req.body;

    try{
    const userInfo = await employeeModel.create(user);
    res.status(201).json({
        message:"User registered successfully",
        user: userInfo,
    });
} catch(error:any) {
    console.error(error);

    if(error.code === '23505'){ //Checking for unique violation (PostgreSQL specific error code)
        res.status(409).json({message:"Email already exists"});
        return;
    }

    res.status(500).json({message:"Internal server error"});
}
}

const loginUser= async (req:Request, res:Response) => {
    const {email, password} = req.body;

    try{
        const user : Employee | null = await employeeModel.getByEmail(email);

        if(!user){
            return res.status(404).json({message:"User not found..."})
        }

        const passwordMatch = await isPasswordMatch(password, user.password_hash);

        if(!passwordMatch){
            return res.status(401).json({message: "Authentication failed..."});
        }

        // After login, create the token
        const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;

        if (!ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }

        if (!REFRESH_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }

        const accessToken = jwt.sign(
            {
                userid: user.id, 
                first_name: user.first_name,
                last_name:user.last_name,
                email: user.email,
                role_id: user.role_id
            },
            ACCESS_TOKEN_SECRET,
            {expiresIn: "60s"}
        );

        const refreshToken = jwt.sign(
            {
                userid: user.id, 
                first_name: user.first_name,
                last_name:user.last_name,
                email: user.email,
                role_id: user.role_id
            },
            REFRESH_TOKEN_SECRET,
            {expiresIn: "3d"}
        );

        //set token in httpOnly
        res.cookie("token", accessToken, {
            httpOnly: true,
            //secure:
            maxAge: 60*1000, //60 seconds
        })

        res.cookie("refresh",refreshToken, {
            httpOnly:true,
            //secure:
            maxAge: 3 * 24 * 60 * 60 * 1000 //3 days
        });

        await tokenModel.updateRefreshToken(refreshToken, user.id);

        const {password_hash, ...userWithoutPasword} = user; //destructure to remove the pasword from the response

        res.json({
            message: "Login sucessfully",
            user: userWithoutPasword,
            accessToken,
            refreshToken,
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}




export default {registerUser,loginUser};