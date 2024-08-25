import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchShifts = createAsyncThunk('shifts/fetchShifts', async () => {
    try{
        const response = await axios.get(`${API_URL}/shifts`);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});