import { jsx as _jsx } from "react/jsx-runtime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const Logout = () => {
    const navigate = useNavigate();
    const logoutUser = async () => {
        try {
            const endpoint = "/user/logout";
            const res = await axios.get(`${API_URL}${endpoint}`, {
                withCredentials: true,
            });
            console.log(res);
            if (res.status === 200) {
                // Redirect to login or home page after logout
                navigate("/login");
            }
        }
        catch (error) {
            console.log(error.response);
        }
    };
    return _jsx("button", { onClick: () => logoutUser(), children: "Logout" });
};
