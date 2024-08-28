import { Request,Response } from "express";
import { Role } from '../types/Role'
import roleModel from "../models/roleModel";



const getAllRoles = async (req:Request,res:Response): Promise<void> => {
    try{
        const roles : Role[] | null = await roleModel.getAll(); 
        res.status(200).json(roles);
    } catch(error){
        console.error(error);
        throw error;
    }
}


export default {getAllRoles};