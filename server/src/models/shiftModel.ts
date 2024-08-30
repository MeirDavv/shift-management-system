import {db} from '../config/db';
import {Shift} from '../types/Shift';

const TABLE_NAME = 'employee_shift_availability'

const getAll = async (): Promise<Shift[]> => {
    try{
        const shifts:Shift[] = await db(TABLE_NAME)
        .select("id","employee_id","shift_id","day_id");
        return shifts;  
    } catch(error){
        console.error(error);
        throw error;
    }
}

// Function to delete all shifts
export const deleteAllShifts = async (): Promise<void> => {
    await db(TABLE_NAME).del(); // This will delete all records from the 'shifts' table
};

const updateShifts = async (shifts: Shift[]): Promise<void> => {
    try{
        await db(TABLE_NAME)
        .insert(shifts)
        // .onConflict(['employee_id','day_id','shift_id'])
        // .merge(); // Updates existing rows if conflicts occur, otherwise inserts new rows
    } catch (error){
        console.error('Error updating shifts:', error);
        throw error;
    }
}

export default {getAll, deleteAllShifts, updateShifts};