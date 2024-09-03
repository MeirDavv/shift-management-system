import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
    try{
        const response = await axios.get(`${API_URL}/api/shifts`);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});