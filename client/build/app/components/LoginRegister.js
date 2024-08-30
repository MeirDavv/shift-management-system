import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const LoginRegister = ({ title }) => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginRegister = async (event) => {
        event.preventDefault();
        const endpoint = title === "Login" ? "/user/login" : "/user/register";
        const requestData = title === "Login"
            ? { email, password }
            : { first_name, last_name, email, password };
        try {
            const response = await axios.post(`${API_URL}${endpoint}`, requestData, {
                withCredentials: true,
            });
            console.log(response);
            if (response.status === 201 || response.status === 200) {
                setMessage(response.data.message);
                console.log(title);
                if (title === "Login") {
                    dispatch(login(email));
                    navigate("/dashboard");
                }
                else {
                    navigate("/login");
                }
            }
        }
        catch (error) {
            console.error("Error:", error);
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h2", { children: title }), _jsxs("form", { onSubmit: handleLoginRegister, children: [title === "Register" && (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", id: "firstName", placeholder: "First Name", onChange: (e) => setFirst_name(e.target.value) }), _jsx("input", { type: "text", id: "lastName", placeholder: "Last Name", onChange: (e) => setLast_name(e.target.value) })] })), _jsx("input", { type: "email", id: "email", placeholder: "Email", onChange: (e) => setEmail(e.target.value) }), _jsx("input", { type: "password", id: "password", placeholder: "password", onChange: (e) => setPassword(e.target.value) }), _jsx("input", { type: "submit", id: "submit", value: title })] }), _jsx("div", { children: message })] }));
};
