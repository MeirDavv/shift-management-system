import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/auth";
import { Role } from "../../utils/roleUtils";

const initialState: AuthState = {
    isAuthenticated: false,
    email: null,
    role:null,
    loading: false,
    message: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login(state, action: PayloadAction<{email:string, role:Role}>){
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.loading = false;
            state.message = "Login successful"
        },
        logout(state){
            state.isAuthenticated = false;
            state.email = null;
            state.role = null;
            state.message = "Logout successful"
        },
        setLoading(state, action:PayloadAction<boolean>){
            state.loading = action.payload;
        },
        setMessage(state, action:PayloadAction<string>){
            state.message = action.payload;
        }
    },
});

export const {login, logout, setLoading, setMessage} = authSlice.actions;
export default authSlice.reducer;