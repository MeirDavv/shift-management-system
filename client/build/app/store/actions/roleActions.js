import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateRoleEmployee } from '../slices/employeeSlice';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
    try {
        const response = await axios.get(`${API_URL}/api/roles/all/names`);
        console.log("response.data: ", response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
export const updateEmployeeRole = createAsyncThunk('roles/updateEmployeeRole', async ({ employeeIdNumber, roleId }, { dispatch }) => {
    try {
        //update in the databsase
        const response = await axios.put(`${API_URL}/user/${employeeIdNumber}/role`, { roleId });
        // update in redux
        dispatch(updateRoleEmployee({ employeeId: employeeIdNumber, roleId: roleId }));
        const updatedRole = response.data;
        return updatedRole;
    }
    catch (error) {
        console.error('Failed to update role', error);
        throw error;
    }
});
