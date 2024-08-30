import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
// Thunk to fetch updated unavailability
export const fetchUnavailability = createAsyncThunk('unavailability/fetchUnavailability', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/unavailability`, { withCredentials: true });
        return response.data;
    }
    catch (error) {
        rejectWithValue(error.response.data);
    }
});
// Thunk to submit updated unavailability
export const submitUnavailability = createAsyncThunk('unavailability/submitUnavailability', async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const updates = Object.keys(state.unavailability.unavailability).map((key) => {
        const [shift_id, day_id] = key.split('-').map(Number);
        return {
            shift_id,
            day_id,
            is_unavailable: state.unavailability.unavailability[key],
        };
    });
    console.log("Data being sent to backend:", updates); // Log the data
    try {
        const response = await axios.post(`${API_URL}/unavailability`, updates, { withCredentials: true });
        return response.data || 'Update successful';
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
});
