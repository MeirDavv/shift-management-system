import { db } from "../config/db";
import { Employee } from "../types/Employee"

const TABLE_NAME:string = 'jwt_tokens'

const updateRefreshToken = async(refreshToken: string, employeeId:number):Promise<number> =>{
    try{
        const affectedRows = await db(TABLE_NAME)
        .update({token:refreshToken})
        .where({employee_id:employeeId});
        return affectedRows;
    } catch(error){
        console.error(`Error updating refresh token for employee ID ${employeeId}:`, error);
        throw error;
    }
}

export default {updateRefreshToken};