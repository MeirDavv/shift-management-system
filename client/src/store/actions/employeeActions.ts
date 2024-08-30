
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchEmployeesNames = createAsyncThunk('employees/fetchEmployeesNames', async () => {
    try{
        const response = await axios.get(`${API_URL}/user/all/names`);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});