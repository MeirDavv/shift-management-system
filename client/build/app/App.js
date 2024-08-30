import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LoginRegister } from "./components/LoginRegister";
import { Dashboard } from "./components/dashboardComponents/layout/Dashboard";
import Auth from "./auth/Auth";
import Unauthorized from "./components/Unauthorized";
export const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(LoginRegister, { title: "Register" }) }), _jsx(Route, { path: "/login", element: _jsx(LoginRegister, { title: "Login" }) }), _jsx(Route, { path: "/dashboard/*", element: _jsx(Auth, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "*", element: _jsx(LoginRegister, { title: "Login" }) }), _jsx(Route, { path: "/unauthorized", element: _jsx(Unauthorized, {}) })] }));
};
