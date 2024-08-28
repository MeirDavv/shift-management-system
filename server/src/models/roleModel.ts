import {db} from '../config/db'
import { Role } from '../types/Role'

const TABLE_NAME:string = 'roles'

const getAll = async ():Promise<Role[]> => {
    try{
        const roles = await db(TABLE_NAME)
        .select("id","name","description");
        return roles
    } catch (error){
        console.error(error);
        throw error;
    }
}

export default {getAll};