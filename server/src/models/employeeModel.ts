import {db} from '../config/db';
import bcrypt from 'bcrypt';
import { Employee, EmployeeIdAndName } from '../types/Employee';

const TABLE_NAME:string = 'employees'

const AWAITING_FOR_APPROVAL_ROLE_ID = 4

const create = async (employeeInfo:Employee):Promise<Partial<Employee>> =>{
    const {first_name, last_name, email, password_hash } = employeeInfo;

    console.log(password_hash);
    const trx = await db.transaction(); //using transaction so that if we fail to insert it will rollback

    try{
        //Hash the password
        const [employee] = await trx(TABLE_NAME)
        .insert({first_name,last_name,email,password_hash, role_id:AWAITING_FOR_APPROVAL_ROLE_ID
        },
            ['email','first_name','last_name']
        );
        await trx.commit();
        return employee;

    } catch(error){
        await trx.rollback();
        console.error(error);
        throw error;
    }
}

const getAllNames = async (): Promise<EmployeeIdAndName[]> => {
    try{
        const employees:EmployeeIdAndName[] = await db(TABLE_NAME)
        .select("id","first_name","last_name","role_id");
        return employees;  
    } catch(error){
        console.error(error);
        throw error;
    }
}


const getById = async (id:number): Promise<Employee | null> => {
    try{
        const [employee] = await db(TABLE_NAME)
        .select("id","first_name","last_name","email","password_hash","role_id")
        .where({id});
        return employee || null;
    } catch(error){
        console.error(error);
        throw error;;
    }
}

const getByEmail = async (email:string): Promise<Employee | null> => {
    try{
        const [employee] = await db(TABLE_NAME)
        .select("id","first_name","last_name","email","password_hash","role_id")
        .where({email});
        return employee || null;
    } catch(error){
        console.error(error);
        throw error;
    }
}

const update = async (id:number, employeeNewDetails:Partial<Employee>): Promise<Employee | null> => {
    const trx = await db.transaction();

    try{

        // Ensure there's something to update
        if(Object.keys(employeeNewDetails).length === 0){
            throw new Error('No data provided to update');
        }

        // Check if new email is already taken
        if(employeeNewDetails.email){
            const existingEmployee = await trx(TABLE_NAME)
            .select('id')
            .where({email:employeeNewDetails.email})
            .andWhereNot({id}) // Exclude the current employee from the check
            .first();

            if(existingEmployee){
                throw new Error('Email is already taken')
            }
        }

        // Update employee record and return the updated row
        const [updatedEmployee] = await trx(TABLE_NAME)
        .update(employeeNewDetails,['id','first_name','last_name','email','password_hash','role_id']);

        await trx.commit();

        if(!updatedEmployee){
            throw new Error(`Employee with id ${id} not found`);
        }

        return updatedEmployee;
    } catch(error){
        await trx.rollback();
        console.error(`Error updating employee with ID ${id}`, error);
        throw error;
    }
}   


const deleteEmployee = async (id:number):Promise<Employee | null> => {
    try{
        const [deletedEmployee] = await db(TABLE_NAME)
        .where({id})
        .del()
        .returning('*');

        return deletedEmployee || null;
    } catch(error){
        console.error(error);
        throw error;
    }
}

const updateEmployeeRole = async (employeeId:number, roleId: number) => {
    try{
        await db(TABLE_NAME)
        .where({id:employeeId})
        .update({
            role_id: roleId,
            updated_at: db.fn.now(),
        });
        // Return the updated employee record (optional)
        const updatedEmployee = await db(TABLE_NAME)
        .where({ id: employeeId })
        .first();

        return updatedEmployee;
    } catch(error){
        console.error('Error updating employee role:',error);
        throw error;
    }
}

export default {create, getAllNames,getById,getByEmail,update,deleteEmployee, updateEmployeeRole}