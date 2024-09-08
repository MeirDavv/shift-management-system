import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const endpoint: string = "/api/user/logout";
      const res = await apiClient.get(endpoint);
      console.log(res);
      if (res.status === 200) {
        // Dispatch the logout action to clear the Redux state
        dispatch(logout());
        
        // Redirect to login or home page after logout
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error.response);
    }
  };
  return <button onClick={() => logoutUser()}>Logout</button>;
};
