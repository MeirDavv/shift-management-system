import { Request,Response } from "express";
import { shiftSettings } from "../types/ShiftSettings";
import shiftSettingsModel from "../models/shiftSettingsModel";
import { CustomRequest } from '../types/customRequest';




const getAllShiftSettings = async (req:CustomRequest,res:Response): Promise<void> => {
    try{
        const shiftSettings : shiftSettings[] | null = await shiftSettingsModel.getAll(); 
        res.status(200).json(shiftSettings);
    } catch(error){
        console.error(error);
        throw error;
    }
}

const updateShiftSettings = async (req:Request, res:Response) => {
    const {shiftId} = (req.params);
    const shiftIdNumber = Number(shiftId)
    const {newShiftSettings} = req.body;

    try{
        const updatedShiftSettings = await shiftSettingsModel.updateShiftSettings(shiftIdNumber,newShiftSettings);
        
        return res.status(200).json({
            message: 'Shift settings updated successfully',
            shiftSettings: updatedShiftSettings, // Optionally include the updated employee data
          }); 
    } catch(error:any){
        return res.status(500).json({
            message: 'Failed to update shift settings',
            error: error.message,
        });
    }
}


export default {getAllShiftSettings, updateShiftSettings};