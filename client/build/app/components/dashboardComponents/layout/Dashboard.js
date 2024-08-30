import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Logout } from "../Logout";
import ShiftsPage from "../pages/ShiftsPage";
import AvailabilityPage from "../pages/AvailabilityPage";
import EmployeesPage from "../pages/EmployeesPage";
import SettingsPage from "../pages/SettingsPage";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Navbar";
import { useDispatch } from "react-redux";
import { fetchEmployeesNames } from "../../../store/actions/employeeActions";
export const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchEmployeesNames());
    }, [dispatch]);
    return (_jsxs("div", { className: "dashboard", children: [_jsx(Navbar, {}), _jsx(Logout, {}), _jsx("main", { className: "main-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "shifts", element: _jsx(ShiftsPage, {}) }), _jsx(Route, { path: "availability", element: _jsx(AvailabilityPage, {}) }), _jsx(Route, { path: "employees", element: _jsx(EmployeesPage, {}) }), _jsx(Route, { path: "settings", element: _jsx(SettingsPage, {}) })] }) })] }));
};
