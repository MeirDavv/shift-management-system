import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const Auth = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    useEffect(() => {
        verifyAuth();
    }, [dispatch]);
    const verifyAuth = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/auth`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                dispatch(login(response.data.email));
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    if (isAuthenticated === null) {
        return _jsx("div", { children: "Loading..." }); // Show a loading spinner or message
    }
    return isAuthenticated ? children : _jsx(Navigate, { to: "/unauthorized", replace: true });
};
export default Auth;
