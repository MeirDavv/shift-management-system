import React from "react";
import { Logout } from "../Logout";
import SchedulePage from "../pages/SchedulePage";
import AvailabilityPage from "../pages/AvailabilityPage";
import EmployeesPage from "../pages/EmployeesPage";
import SettingsPage from "../pages/SettingsPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar></Navbar>
      <Logout></Logout>
      <main className="main-content">
        <Routes>
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};
