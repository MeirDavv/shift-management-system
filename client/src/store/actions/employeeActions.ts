
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchEmployeesNames = createAsyncThunk('employees/fetchEmployeesNames', async () => {
    try{
        const response = await axios.get(`${API_URL}/api/user/all/names`);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});