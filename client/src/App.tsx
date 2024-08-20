import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginRegister } from "./components/LoginRegister";
import { Dashboard } from "./components/Dashboard";
import Auth from "./auth/Auth";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={<LoginRegister title={"Register"} />}
        />
        <Route path="/login" element={<LoginRegister title={"Login"} />} />
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
      </Routes>
    </Router>
  );
};
