import React, { useEffect } from "react";
import { Logout } from "../Logout";
import SchedulePage from "../pages/SchedulePage";
import AvailabilityPage from "../pages/AvailabilityPage";
import EmployeesPage from "../pages/EmployeesPage";
import SettingsPage from "../pages/SettingsPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { fetchEmployees } from "../../../store/actions/employeeActions";
import { fetchSchedule } from "../../../store/actions/scheduleActions";

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(fetchEmployees());
    dispatch(fetchSchedule());

  },[dispatch])
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
