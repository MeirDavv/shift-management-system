import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginRegister } from "./components/LoginRegister";
import { Dashboard } from "./components/dashboardComponents/layout/Dashboard";
import Auth from "./auth/Auth";
import Unauthorized from "./components/Unauthorized";

export const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<LoginRegister title={"Register"} />} />
      <Route path="/login" element={<LoginRegister title={"Login"} />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          <Auth>
            <Dashboard />
          </Auth>
        }
      />

      {/*default redirect or catch-all route */}
      <Route path="*" element={<LoginRegister title={"Login"} />} />

      {/* Unauthorized routes */}
      <Route path="/unauthorized" element={<Unauthorized></Unauthorized>} />
    </Routes>
  );
};
