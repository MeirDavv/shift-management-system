import { Request, Response } from "express";
import shiftModel from '../models/shiftModel';

const getShifts = async (req:Request, res:Response) => {
    try{
        const shifts = await shiftModel.getAll();
        res.status(200).json(shifts)
    } catch(error){
        console.error(error);
        throw error;
    }
}

export default {getShifts};