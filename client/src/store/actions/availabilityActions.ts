import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UnavailabilityState } from "../interfaces/availability";

const API_URL = import.meta.env.VITE_BASE_URL;

// Thunk to fetch updated unavailability
export const fetchUnavailability = createAsyncThunk('unavailability/fetchUnavailability',
    async (_, {rejectWithValue}) => {
        try{
            const response = await axios.get(`${API_URL}/api/unavailability`,{withCredentials: true});
            return response.data;
        }catch(error:any){
            rejectWithValue(error.response.data);
        }
    }
)

// Thunk to submit updated unavailability
export const submitUnavailability = createAsyncThunk('unavailability/submitUnavailability', 
    async (_,{getState, rejectWithValue}) => {
        const state = getState() as {unavailability:UnavailabilityState};
        const updates = Object.keys(state.unavailability.unavailability).map((key)=> {
            const [shift_id, day_id] = key.split('-').map(Number);
            return {
                shift_id,
                day_id,
                is_unavailable: state.unavailability.unavailability[key],
            };
        });

        console.log("Data being sent to backend:", updates); // Log the data

        try {
            const response = await axios.post(`${API_URL}/api/unavailability`, updates, {withCredentials:true});
            return response.data || 'Update successful';
        } catch (error:any){
            return rejectWithValue(error.response.data);
        }
    }
)