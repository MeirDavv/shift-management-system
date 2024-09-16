import employeeModel from "../models/employeeModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request,Response } from "express";
import dotenv from "dotenv";
import { Employee, EmployeeIdAndName } from "../types/Employee";
import tokenModel from "../models/tokenModel";
import { hashPassword, isPasswordMatch } from "./utils";
import { CustomRequest } from "../types/customRequest";

dotenv.config();

const getAllUsersNames = async (req:Request,res:Response): Promise<void> => {
    try{
        const users : EmployeeIdAndName[] | null = await employeeModel.getAllNames(); 
        res.status(200).json(users);
    } catch(error){
        console.error(error);
        throw error;
    }
}

const registerUser= async (req:Request,res:Response): Promise<void> => {
    try{
        
    // Destructure the necessary fields from req.body
    const { first_name, last_name, email, password } = req.body;

    // Hash the plain text password
    const password_hash = await hashPassword(password);
    
    // Create a user object that matches the Employee interface
    const user:Employee = {
        first_name,
        last_name,
        email,
        password_hash
    }
    
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


        if (!user.id){
            throw new Error("User doesn't have an id")
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
            {expiresIn: "5s"}
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
            maxAge: 5*1000, //5 seconds
        })

        res.cookie("refresh",refreshToken, {
            httpOnly:true,
            //secure:
            maxAge: 3 * 24 * 60 * 60 * 1000 //3 days
        });

        const accessTokenExpiresAt = new Date(Date.now() + 60 * 1000); // 60 seconds
        const refreshTokenExpiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

        await tokenModel.upsertToken(user.id, accessToken,accessTokenExpiresAt,refreshToken,refreshTokenExpiresAt );

        const {password_hash:_, ...userWithoutPasword} = user; //destructure to remove the pasword from the response

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

const logoutUser = async (req:CustomRequest,res:Response) => {
    const options = {
        httpOnly: true,
        //secure:
        maxAge: 0, //delete immediately
    }
    res.cookie('token','expiredToken', options);
    res.cookie('refresh', 'expiredToken', options);    // Clear refresh token
    
    // Remove the tokens from the database using the employee's ID
    const deletedRows = await tokenModel.removeTokens(req.userid);
    console.log(`Deleted ${deletedRows} token(s) for employee ID ${req.userid}`);
    res.status(200).json({status: "success"});

    }

const authUser = async (req:CustomRequest, res:Response) => {
    res.status(200).json({
        token: req.token,
        email: req.email,
        userid: req.userid,
        first_name: req.first_name,
        last_name: req.last_name,
        role_id: req.role_id
    });
};

const updateEmployeeRole = async (req:Request, res:Response) => {
    const {employeeId} = (req.params);
    const employeeIdNumber = Number(employeeId)
    const {roleId} = req.body;

    try{
        const updatedEmployee = await employeeModel.updateEmployeeRole(employeeIdNumber,roleId);
        
        return res.status(200).json({
            message: 'Employee role updated successfully',
            employee: updatedEmployee, // Optionally include the updated employee data
          }); 
    } catch(error:any){
        return res.status(500).json({
            message: 'Failed to update eemployee role',
            error: error.message,
        });
    }
}


export default {getAllUsersNames, registerUser,loginUser, logoutUser, authUser,updateEmployeeRole};