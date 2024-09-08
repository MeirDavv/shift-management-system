import { db } from "../config/db";
import { Employee } from "../types/Employee"

const TABLE_NAME:string = 'jwt_tokens'

const upsertToken = async(employeeId:number, accessToken: string,accessTokenExpiresAt:Date, refreshToken: string, refreshTokenExpiresAt: Date):Promise<number> =>{
    try{
        const existingToken = await db(TABLE_NAME).where({employee_id:employeeId}).first();

        if (existingToken){
            //if exists, update the record
            const affectedRows = await db(TABLE_NAME)
            .update({access_token: accessToken, access_token_expires_at:accessTokenExpiresAt, refresh_token:refreshToken, refresh_token_expires_at:refreshTokenExpiresAt})
            .where({employee_id: employeeId});
            return affectedRows;
        }
        else{
            // If doesnt exist, insert a new record
            const insertedId = await db(TABLE_NAME).insert({
                employee_id: employeeId, access_token: accessToken, access_token_expires_at:accessTokenExpiresAt, refresh_token:refreshToken, refresh_token_expires_at:refreshTokenExpiresAt
            }).returning('id');
            
            return Array.isArray(insertedId) ? insertedId[0] : insertedId;
        }
    } catch(error){
        console.error(`Error saving token for employee ID ${employeeId}:`,error);
        throw error;
    }
}

const removeTokens = async (employeeId:number):Promise<number> => {
    try{
        const deletedRows = await db(TABLE_NAME)
        .where({employee_id:employeeId})
        .del();
        return deletedRows;
    } catch(error){
        console.error(`Error removing tokens for employee ID ${employeeId}`, error);
        throw error;
    }
}

const getTokenByEmployeeId = async (employeeId: number): Promise<{access_token:string, refresh_token:string} | null> => {
    try{
        const tokenData = await db(TABLE_NAME)
        .select('access_token', 'refresh_token')
        .where({employee_id: employeeId})
        .first();

        return tokenData || null;
    }catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
};

const updateAccessToken = async (employeeId: number, accessToken:string, accessTokenExpiresAt: Date): Promise<number> => {
    try{
        const affectedRows = await db(TABLE_NAME)
        .update({access_token: accessToken, access_token_expires_at: accessTokenExpiresAt})
        .where({employee_id:employeeId});
        return affectedRows;
    } catch(error){
        console.error(`Error updating access token for employee ID ${employeeId}`, error);
        throw error;
    }
}

export default {upsertToken, removeTokens, getTokenByEmployeeId, updateAccessToken};