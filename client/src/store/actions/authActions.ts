import {AppDispatch} from '../index'
import {login, setLoading, setMessage} from '../slices/authSlice'
import apiClient from '../../apiClient';
import { roleMap } from '../../utils/roleUtils';

export const loginUser = (credentials:{email:string,password:string}, navigate: Function) => async(dispatch:AppDispatch) => {
    try{
        dispatch(setLoading(true));
        const endpoint = '/api/user/login';
        const response = await apiClient.post(endpoint,credentials);

        const {accessToken, user} = response.data;

        const role = roleMap[user.role_id];

        dispatch(login({
            token: accessToken,
            email: user.email,
            role: role
        }));
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
        const endpoint = '/api/user/register';
        const response = await apiClient.post(endpoint,userData);
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
        const endpoint = '/api/user/auth';
        const response = await apiClient.get(endpoint);
        dispatch(login(response.data.email))
    }catch(error){
        console.error(error);
    }finally {
        dispatch(setLoading(false));
    }
}