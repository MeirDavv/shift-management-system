import axios from 'axios';
import { login, setLoading, setMessage } from '../slices/authSlice';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const loginUser = (credentials, navigate) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(`${API_URL}/user/login`, credentials, { withCredentials: true });
        dispatch(login(response.data.user.email));
        navigate("/dashboard");
    }
    catch (error) {
        dispatch(setMessage(error.response?.data?.message || "An error occurred. Please try again."));
    }
    finally {
        dispatch(setLoading(false));
    }
};
export const registerUser = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(`${API_URL}/user/register`, userData, { withCredentials: true });
        dispatch(setMessage(response.data.message));
        navigate("/login");
    }
    catch (error) {
        dispatch(setMessage(error.response?.data?.message || "An error occurred. Please try again."));
    }
    finally {
        dispatch(setLoading(false));
    }
};
export const verifyUser = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/user/auth`, { withCredentials: true });
        dispatch(login(response.data.email));
    }
    catch (error) {
        console.error(error);
    }
    finally {
        dispatch(setLoading(false));
    }
};
