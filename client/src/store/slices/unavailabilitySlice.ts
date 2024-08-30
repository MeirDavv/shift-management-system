import { createSlice } from "@reduxjs/toolkit";
import { Unavailability, UnavailabilityState } from "../interfaces/availability";
import { fetchUnavailability, submitUnavailability } from "../actions/availabilityActions";


const initialState: UnavailabilityState = {
    unavailability: {},
    loading: false,
    error: null,
}

const unavailabilitySlice = createSlice({
    name: 'unavailability',
    initialState,
    reducers: {
        updateUnavailability: (state, action) => {
            const {shift_id, day_id, is_unavailable} = action.payload;
            const key = `${shift_id}-${day_id}`;
            state.unavailability[key] = is_unavailable;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUnavailability.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUnavailability.fulfilled, (state,action) => {
            const fetchedData = action.payload;
            console.log('Fetched Data:', fetchedData);

            fetchedData.forEach((item:Unavailability) => {
                const key = `${item.shift_id}-${item.day_id}`;
                state.unavailability[key] = item.is_unavailable;
            });
            state.loading = false;
        })
        .addCase(fetchUnavailability.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(submitUnavailability.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(submitUnavailability.fulfilled, (state) =>{
            state.loading = false;
            state.error = null;
        })
        .addCase(submitUnavailability.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; 
        })
    },
});

export const {updateUnavailability} = unavailabilitySlice.actions;
export default unavailabilitySlice.reducer;