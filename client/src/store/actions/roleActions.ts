import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../interfaces/role';
import { updateRoleEmployee } from '../slices/employeeSlice';


const API_URL = process.env.REACT_APP_BASE_URL || "https://shift-management-system.onrender.com";

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
    try{
        const response = await axios.get(`${API_URL}/api/roles/all/names`);
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
            const response = await axios.put(`${API_URL}/api/user/${employeeIdNumber}/role`, {roleId});

            // update in redux
            dispatch(updateRoleEmployee({employeeId:employeeIdNumber, roleId:roleId}));

            const updatedRole:Role = response.data;
            return updatedRole;
        } catch(error){
            console.error('Failed to update role', error);
            throw error;
        }
});