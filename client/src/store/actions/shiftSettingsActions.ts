
import { createAsyncThunk } from '@reduxjs/toolkit';
import {shiftSettings} from '../interfaces/shiftSettings'
import { updateShiftSettings } from '../slices/shiftSettingsSlice';
import apiClient from '../../apiClient';


const API_URL = import.meta.env.VITE_API_URL;

export const fetchShiftSettings = createAsyncThunk(
    'shiftSetings/fetchShiftSettings', 
    async () => {
    try{
        const endpoint = '/api/shiftSettings/all';
        const response = await apiClient.get<shiftSettings[]>(endpoint);
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
            const endpoint = `/api/shiftSettings/${shiftSettings.id}/update`;
            const response = await apiClient.put(endpoint, {newShiftSettings:shiftSettings});

            // update in redux
            dispatch(updateShiftSettings(shiftSettings));

            const updatedShiftSettings:shiftSettings = response.data;
            return updatedShiftSettings;
        } catch(error){
            console.error('Failed to update shift settings', error);
            throw error;
        }
});