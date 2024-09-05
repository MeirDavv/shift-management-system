import { createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../interfaces/role';
import { updateRoleEmployee } from '../slices/employeeSlice';
import apiClient from '../../apiClient';


export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
    try{
        const endpoint = '/api/roles/all/names';
        const response = await apiClient.get(endpoint);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});

export const updateEmployeeRole = createAsyncThunk(
    'roles/updateEmployeeRole', 
    async ({employeeIdNumber,roleId}:{employeeIdNumber:number,roleId:number}, {dispatch})=>{
        try {
            //update in the databsase
            const endpoint = `/api/user/${employeeIdNumber}/role`;
            const response = await apiClient.put(endpoint, {roleId});

            // update in redux
            dispatch(updateRoleEmployee({employeeId:employeeIdNumber, roleId:roleId}));

            const updatedRole:Role = response.data;
            return updatedRole;
        } catch(error){
            console.error('Failed to update role', error);
            throw error;
        }
});