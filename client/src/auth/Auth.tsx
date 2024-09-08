import { useEffect, useState } from "react";
import { AuthProps } from "../interfaces/Auth";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { login } from "../store/slices/authSlice";
import apiClient from "../apiClient";
import { roleMap } from "../utils/roleUtils";


const Auth: React.FC<AuthProps> = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyAuth();
  }, [dispatch]);

  const verifyAuth = async () => {
    try {
      const endpoint = '/api/user/auth';
      const response = await apiClient.get(endpoint);

      if (response.status === 200) {
        const role = roleMap[response.data.role_id]; // Map role_id to Role
        dispatch(login({token:response.data.token, email: response.data.email, role: role}));
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default Auth;
