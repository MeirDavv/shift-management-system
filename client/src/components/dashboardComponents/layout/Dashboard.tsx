import React, { useEffect } from "react";
import { Logout } from "../Logout";
import ShiftsPage from "../pages/ShiftsPage";
import AvailabilityPage from "../pages/AvailabilityPage";
import EmployeesPage from "../pages/EmployeesPage";
import SettingsPage from "../pages/SettingsPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { fetchEmployeesNames} from "../../../store/actions/employeeActions";

export const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(fetchEmployeesNames());

  },[dispatch])
  return (
    <div className="dashboard">
      <Navbar></Navbar>
      <Logout></Logout>
      <main className="main-content">
        <Routes>
          <Route path="shifts" element={<ShiftsPage />} />
          <Route path="availability" element={<AvailabilityPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};
