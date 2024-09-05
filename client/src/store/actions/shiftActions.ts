import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../apiClient";


export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
    try{
        const endpoint = '/api/shifts';
        const response = await apiClient.get(endpoint);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});