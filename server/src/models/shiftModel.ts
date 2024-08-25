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

export default {getAll};