import { useEffect } from "react";
import axios from "axios";
import { AuthProps } from "../interfaces/Auth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login } from "../store/slices/authSlice";

const API_URL = process.env.REACT_APP_BASE_URL || "https://shift-management-system.onrender.com";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    verifyAuth();
  }, [dispatch]);

  const verifyAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/auth`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(login(response.data.email));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return isAuthenticated ? children : <Navigate to="/unauthorized" replace />;
};

export default Auth;
