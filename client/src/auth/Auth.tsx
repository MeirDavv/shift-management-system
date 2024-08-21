import { useEffect, useState } from "react";
import axios from "axios";
import { LoginRegister } from "../components/LoginRegister";
import { AuthProps } from "../types/Auth";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/auth`, {
        // headers: {
        //   "x-access-token": "token",
        // },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(response.data);
        setIsAuthorized(true);
        // //   Check if required role is provided and if its matches the user role
        // if (!requiredRole || userRole === requiredRole) {
        //   setIsAuthorized(true);
        // } else {
        //   setIsAuthorized(false);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return isAuthorized ? children : <Navigate to="/unauthorized" replace />;
};

export default Auth;
