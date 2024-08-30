import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shiftSettings, ShiftSettingsState } from "../interfaces/shiftSettings";
import { fetchShiftSettings } from "../actions/shiftSettingsActions";

const initialState : ShiftSettingsState = {
    list: [],
    loading: false,
    error: null
};

const shiftSettingsSlice = createSlice({
    name: "shiftSettings",
    initialState,
    reducers: {
        setShiftSettings(state, action:PayloadAction<shiftSettings[]>){
            state.list = action.payload;
        },
        updateShiftSettings(state,action:PayloadAction<shiftSettings>){
            const index = state.list.findIndex((shiftSetting)=>shiftSetting.id ===action.payload.id);
            if (index !== -1){
                state.list[index] = action.payload;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchShiftSettings.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchShiftSettings.fulfilled, (state,action)=>{
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchShiftSettings.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch employees';
        })
    }
});

export const {setShiftSettings, updateShiftSettings} = shiftSettingsSlice.actions;
export default shiftSettingsSlice.reducer