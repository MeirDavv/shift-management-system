import { createSlice } from "@reduxjs/toolkit";
import { fetchShifts } from "../actions/shiftActions";
const initialState = {
    list: [],
    loading: false,
    error: null
};
const shiftSlice = createSlice({
    name: 'shifts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShifts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchShifts.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchShifts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch shifts';
        });
    }
});
export default shiftSlice.reducer;
