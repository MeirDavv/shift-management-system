import {AppDispatch} from '../index';
import { setEmployees } from '../slices/employeeSlice';
import { Employee } from '../interfaces/employee';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchEmployees = () => async (dispatch:AppDispatch) => {
    try{
        const response = await axios.get(`${API_URL}/schedule`, { withCredentials: true });
        const data: Employee[] = await response.data;
        dispatch(setEmployees(data));
    } catch(error){
        console.error("Error fetching employees:", error);
    }

};