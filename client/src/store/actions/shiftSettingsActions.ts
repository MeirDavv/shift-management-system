import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {shiftSettings} from '../interfaces/shiftSettings'
import { updateShiftSettings } from '../slices/shiftSettingsSlice';


const API_URL = process.env.REACT_APP_API_URL || "https://shift-management-system.onrender.com";

export const fetchShiftSettings = createAsyncThunk('shiftSetings/fetchShiftSettings', async () => {
    try{
        const response = await axios.get(`${API_URL}/shiftSettings/all`);
        console.log("response.data: ", response.data);
        return response.data;
    } catch (error){
        console.error(error);
        throw error;
    }
});

export const updateShiftSettingsAction = createAsyncThunk(
    'shiftSettings/updateShiftSettings', 
    async ({shiftSettings}:{shiftSettings:shiftSettings}, {dispatch})=>{
        try {
            //update in the databsase
            const response = await axios.put(`${API_URL}/shiftSettings/${shiftSettings.id}/update`, {newShiftSettings:shiftSettings});

            // update in redux
            dispatch(updateShiftSettings(shiftSettings));

            const updatedShiftSettings:shiftSettings = response.data;
            return updatedShiftSettings;
        } catch(error){
            console.error('Failed to update shift settings', error);
            throw error;
        }
});