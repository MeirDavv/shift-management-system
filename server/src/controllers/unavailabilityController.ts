import { Request, Response } from "express";
import unavailabilityModel from '../models/unavailabilityModel';
import { Unavailability } from "../types/Unavailability";

const getUnavailableShifts = async (req:Request, res:Response) => {
    try{
        if (req.userid !== undefined) {
            const unavailableShifts = await unavailabilityModel.getByEmployeeId(req.userid);
            res.status(200).json(unavailableShifts);
        } else {
            return res.status(400).json({ message: "User ID is missing" });
        }
    } catch(error){
        console.error(error);
        throw error;
    }
}

const submitUnavailableShifts = async (req:Request, res:Response) => {
    const employeeId = req.userid;
    const updates:Unavailability[] = req.body;
    
    try{
        if(employeeId !== undefined){
            for (const update of updates){
                await unavailabilityModel.submitUnavailability(update, employeeId)
            }
            res.status(200).json({message: "Update successful"});
    }
    else{
        return res.status(400).json({ message: "User ID is missing" });
    }

    } catch(error){
        console.error(error);
        throw error;
    }
}


export default {getUnavailableShifts, submitUnavailableShifts};