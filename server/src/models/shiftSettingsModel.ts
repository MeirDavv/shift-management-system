import { db } from "../config/db";
import { shiftSettings } from "../types/ShiftSettings";
import asyncLocalStorage from "../context/asyncLocalStorage";


const TABLE_NAME = 'shifts';

const getAll = async ():Promise<shiftSettings[]> => {
    try{
        const store = asyncLocalStorage.getStore(); 

        if(!store || !store.organization_id){
            throw new Error ("organization_id is missing");
        }
        const shiftSettings:shiftSettings[] = await db(TABLE_NAME)
        .select("id", "name", "start_time","end_time","min_employee_count","max_employee_count")
        .where({organization_id:store.organization_id})
        .orderBy("id");
        return shiftSettings;
    } catch(error){
        console.error(error);
        throw error;
    }
}

const updateShiftSettings = async (shiftId:number,newShiftSettings:shiftSettings) => {
    try{
        
        await db(TABLE_NAME)
        .where({id:shiftId})
        .update({
            start_time:newShiftSettings.start_time,
            end_time: newShiftSettings.end_time,
            min_employee_count: newShiftSettings.min_employee_count,
            max_employee_count: newShiftSettings.max_employee_count,
            updated_at: db.fn.now()
        })
        // Return the updated shiftSetting record (optional)
        const updatedShiftSettings = await db(TABLE_NAME)
        .where({ id: shiftId })
        .first();
        return updatedShiftSettings;
    }catch(error){
        console.error('Error updating shift settings:',error);
        throw error;
    }
}

export default {getAll,updateShiftSettings};