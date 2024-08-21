import { useEffect, useState } from "react";
import axios from "axios";
import { LoginRegister } from "../components/LoginRegister";
import { AuthProps } from "../types/Auth";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Auth: React.FC<AuthProps> = ({ children }) => {
  console.log("auth component triggered");
  const [redirect, setRedirect] = useState<boolean | null>(null);

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/auth`, {
        headers: {
          "x-access-token": "token",
        },
        withCredentials: true,
      });
      console.log(response.status);
      if (response.status === 200) {
        setRedirect(true);
        console.log("yes");
      }
      console.log(redirect);
    } catch (error) {
      setRedirect(false);
    }
  };

  console.log(redirect);
  if (redirect === null) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return redirect ? children : <Navigate to="/login" replace />;
};

export default Auth;
