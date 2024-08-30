import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRoles, updateEmployeeRole } from '../../../store/actions/roleActions';
const EmployeesPage = () => {
    const dispatch = useDispatch();
    const { list: employees } = useSelector((state) => state.employees);
    const { list: roles } = useSelector((state) => state.roles);
    const [selectedRoles, setSelectedRoles] = useState({}); //[employeeId]: roleId
    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);
    const handleRoleChange = (employeeId, roleId) => {
        setSelectedRoles(prevState => ({
            ...prevState,
            [employeeId]: roleId
        }));
    };
    const handleSubmit = () => {
        Object.keys(selectedRoles).forEach(employeeId => {
            const employeeIdNumber = Number(employeeId);
            const roleId = selectedRoles[employeeIdNumber];
            dispatch(updateEmployeeRole({ employeeIdNumber, roleId }));
        });
    };
    return (_jsxs("section", { children: [_jsx("h2", { children: "Employees" }), _jsx("ul", { children: employees.map((employee) => (_jsxs("li", { children: [employee.first_name, " ", employee.last_name, " -", _jsx("select", { name: "roles", id: "roles", value: selectedRoles[employee.id] || employee.role_id, onChange: (e) => handleRoleChange(employee.id, Number(e.target.value)), children: roles.map((role) => (_jsx("option", { value: role.id, children: role.name }, role.id))) })] }, employee.id))) }), _jsx("button", { onClick: handleSubmit, children: "Submit changes" })] }));
};
export default EmployeesPage;
