import { AppDispatch } from '../index';
import { setSchedule } from '../slices/scheduleSlice';
import { Schedule } from '../interfaces/schedule';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchSchedule = () => async (dispatch: AppDispatch) => {
    try {
        const response = await axios.get(`${API_URL}/schedule`, { withCredentials: true });
        const data:Schedule[] = response.data;
        dispatch(setSchedule(data));
      } catch (error) {
        console.error("Error fetching schedule:", error);
}
}