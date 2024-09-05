import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";

const API_URL = import.meta.env.VITE_API_URL;

export const Logout = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const endpoint: string = "/api/user/logout";
      const res = await apiClient.get(endpoint);
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
