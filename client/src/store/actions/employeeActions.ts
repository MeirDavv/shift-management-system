
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../apiClient';

export const fetchEmployeesNames = createAsyncThunk('employees/fetchEmployeesNames', async () => {
    try{
        const endpoint = '/api/user/all/names';
        const response = await apiClient.get(endpoint);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});