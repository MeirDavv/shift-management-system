import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (_jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: "shifts", children: "Shifts" }) }), _jsx("li", { children: _jsx(Link, { to: "availability", children: "Availability" }) }), _jsx("li", { children: _jsx(Link, { to: "employees", children: "Employees" }) }), _jsx("li", { children: _jsx(Link, { to: "settings", children: "Settings" }) })] }) }));
};
export default Navbar;
