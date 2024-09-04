import { Request, Response } from "express";
import shiftModel from '../models/shiftModel';
import {Shift} from '../types/Shift';
import { exec } from "child_process";
import path from "path";
import axios from 'axios';


const getShifts = async (req:Request, res:Response):Promise<void> => {
    try{
        const shifts = await shiftModel.getAll();
        res.status(200).json(shifts)
    } catch(error){
        console.error(error);
        throw error;
    }
}

const updateShifts = async (req:Request, res:Response):Promise<void> => {

    try {
        const shifts: Shift[] = req.body; // Extract the shifts data from the request body

        if (!Array.isArray(shifts) || shifts.length === 0){
            res.status(400).json({message: "Invalid data: shifts should be a non-empty array."});
            return;
        }
         // Step 1: Delete all existing shifts
         await shiftModel.deleteAllShifts();

         // Step 2: Insert new shifts
         await shiftModel.updateShifts(shifts); // Call the model function to update the shifts
         res.status(200).json({message: 'Shifts updated successfully'}); // Respond with a success message
    } catch(error){
        console.error('Error updating shifts:', error);
        res.status(500).json({ message: 'Internal server error' });  // Handle errors and respond with a 500 status
    }
};

// Route handler to trigger Pyhton script
const runAIScript = async (req:Request, res:Response): Promise<void> => {
    try{
        const python_api_url = process.env.AI_SCRIPT_URL;
        const endpoint = '/api/run-ai-script';

        const token = req.cookies['token'];

        if(!token){
            res.status(401).json({error: "No authorization token found in request"});
            return;
        }

        const response = await axios.post(
            `${python_api_url}${endpoint}`,
        {}, //No payload needed
        {
            headers: {
                Authorization: `Bearer ${token}`, //Include the token in the Authorization header
            }
        });
        res.status(200).json(response.data);
    } catch(error:any){
        console.error(`Error: ${error.message}`);
        res.status(500).json({error: 'Failed to execute AI script', details: error.message});
    }
};

export default {getShifts, updateShifts, runAIScript};