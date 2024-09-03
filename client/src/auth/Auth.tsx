import { useEffect } from "react";
import axios from "axios";
import { AuthProps } from "../interfaces/Auth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login } from "../store/slices/authSlice";
import { Role } from "../utils/roleUtils";

const API_URL = import.meta.env.VITE_API_URL;

const roleMapping:any = {
  1: Role.Admin,
  2: Role.Manager,
  3: Role.Worker,
  // Add other mappings as needed
};

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
        const role = roleMapping[response.data.role_id]; // Map role_id to Role
        dispatch(login({email: response.data.email, role: role}));
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
