import {AppDispatch} from '../index'
import axios from 'axios'
import {login, setLoading, setMessage} from '../slices/authSlice'

const API_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = (credentials:{email:string,password:string}, navigate: Function) => async(dispatch:AppDispatch) => {
    try{
        dispatch(setLoading(true));
        const response = await axios.post(`${API_URL}/api/user/login`,credentials, {withCredentials:true});
        dispatch(login(response.data.user.email));
        navigate("/dashboard");
    } catch(error:any){
        dispatch(setMessage(error.response?.data?.message || "An error occurred. Please try again."));
    } finally {
        dispatch(setLoading(false));
    }
}

export const registerUser = (userData : {first_name:string,last_name:string, email:string, password:string}, navigate: Function) => async (dispatch: AppDispatch) => {
    try{
        dispatch(setLoading(true));
        const response = await axios.post(`${API_URL}/api/user/register`,userData, {withCredentials:true});
        dispatch(setMessage(response.data.message));
        navigate("/login");
    } catch(error:any){
        dispatch(setMessage(error.response?.data?.message || "An error occurred. Please try again."));
    } finally {
        dispatch(setLoading(false));
    }    
}

export const verifyUser = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_URL}/api/user/auth`, {withCredentials: true});
        dispatch(login(response.data.email))
    }catch(error){
        console.error(error);
    }finally {
        dispatch(setLoading(false));
    }
}