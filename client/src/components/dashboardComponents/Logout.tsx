import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "https://shift-management-system.onrender.com";

export const Logout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const endpoint: string = "/user/logout";
      const res = await axios.get(`${API_URL}${endpoint}`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        // Redirect to login or home page after logout
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return <button onClick={() => logoutUser()}>Logout</button>;
};
