import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginRegisterProps } from "../types/LoginRegister";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const LoginRegister: React.FC<LoginRegisterProps> = ({ title }) => {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleLoginRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const endpoint = title === "Login" ? "/user/login" : "/user/register";
    const requestData =
      title === "Login"
        ? { email, password }
        : { first_name, last_name, email, password };

    try {
      const response = await axios.post(`${API_URL}${endpoint}`, requestData, {
        withCredentials: true,
      });

      console.log(response);

      if (response.status === 201 || response.status === 200) {
        setMessage(response.data.message);
        console.log(response.data);
        if (title === "Login") {
          navigate("/dashboard");
        } else {
          navigate("/login");
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <form onSubmit={handleLoginRegister}>
        {title === "Register" && (
          <>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              onChange={(e) => setLast_name(e.target.value)}
            />
          </>
        )}

        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input type="submit" id="submit" value={title} />
      </form>
      <div>{message}</div>
    </>
  );
};
