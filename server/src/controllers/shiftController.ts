import { Request, Response } from "express";
import shiftModel from '../models/shiftModel';
import {Shift} from '../types/Shift';
import { exec } from "child_process";
import path from "path";


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

         await shiftModel.updateShifts(shifts); // Call the model function to update the shifts
         res.status(200).json({message: 'Shifts updated successfully'}); // Respond with a success message
    } catch(error){
        console.error('Error updating shifts:', error);
        res.status(500).json({ message: 'Internal server error' });  // Handle errors and respond with a 500 status
    }
};

// Route handler to trigger Pyhton script
const runAIScript = async (req:Request, res:Response): Promise<void> => {
    const scriptPath = path.join(__dirname,'../ai/shift_calculator.py');

    exec(`python3 ${scriptPath}`, {timeout: 5000}, (error, stdout, stderr)=>{
        if(error){
            console.error(`Execution error: ${error.message}`);
            res.status(500).json({error:'Execution failed', details: error.message});
            return;
        }
        if(stderr){
            console.error(`stderr: ${stderr}`);
            res.status(500).json({error: 'Script error', details: stderr});
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).json({message: 'AI script executed successfully', output:stdout});
    });
};

export default {getShifts, updateShifts, runAIScript};