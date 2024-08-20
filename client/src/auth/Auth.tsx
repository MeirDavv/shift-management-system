import { useEffect, useState } from "react";
import axios from "axios";
import { LoginRegister } from "../components/LoginRegister";
import { AuthProps } from "../types/Auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Auth: React.FC<AuthProps> = ({ children }) => {
  const [redirect, setRedirect] = useState(false);

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
      if (response.status === 200) setRedirect(true);
    } catch (error) {
      setRedirect(false);
    }
  };

  return redirect ? children : <LoginRegister title={"Login"} />;
};

export default Auth;
