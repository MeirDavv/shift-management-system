import {db} from '../config/db';
import {Unavailability} from '../types/Unavailability';
import employeeModel from './employeeModel';
import asyncLocalStorage from "../context/asyncLocalStorage";


const TABLE_NAME = 'employee_shift_unavailability'

const getAll = async (): Promise<Unavailability[]> => {
    try{
        const store = asyncLocalStorage.getStore(); 

        if(!store || !store.organization_id){
            throw new Error ("organization_id is missing");
        }
        const unavailabilityShifts:Unavailability[] = await db(TABLE_NAME)
        .select("id","employee_id","shift_id","day_id","is_unavailable")
        .where({organization_id:store.organization_id});
        return unavailabilityShifts;
    } catch(error){
        console.error(error);
        throw error;
    }
}

const getByEmployeeId = async (employee_id:number): Promise<Unavailability[]> => {
    try{
        const unavailabilityShifts:Unavailability[] = await db(TABLE_NAME)
        .select("id","shift_id","day_id","is_unavailable")
        .where({employee_id});
        return unavailabilityShifts;
    } catch(error){
        console.error(error);
        throw error;
    }
}

const submitUnavailability = async (update:Unavailability, employee_id: number ): Promise<void> => {
    try{
        const organizationId = await employeeModel.getOrganizationId();
        await db(TABLE_NAME)
        .insert({
            employee_id,
            shift_id: update.shift_id,
            day_id: update.day_id,
            is_unavailable: update.is_unavailable,
            organization_id:organizationId,
        })
        .onConflict(['employee_id', 'shift_id', 'day_id'])
        .merge({
            is_unavailable: update.is_unavailable,
            updated_at: db.fn.now(),
        });
        } catch(error){
        console.error(error);
        throw error;
    }
}

export default {getAll, getByEmployeeId, submitUnavailability};