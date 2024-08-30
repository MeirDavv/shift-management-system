import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShifts } from "../../../store/actions/shiftActions";
import { fetchEmployeesNames } from "../../../store/actions/employeeActions";
import RunAIScriptButton from "../../RunAIScriptButton";
const ShiftsPage = () => {
    const dispatch = useDispatch();
    const { list: listShifts } = useSelector((state) => state.shifts);
    const { list: listEmployeesNames } = useSelector((state) => state.employees);
    const employeeObject = listEmployeesNames.reduce((acc, employee) => {
        acc[employee.id] = `${employee.first_name} ${employee.last_name}`;
        return acc;
    }, {});
    useEffect(() => {
        dispatch(fetchShifts());
        dispatch(fetchEmployeesNames());
    }, [dispatch]);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shifts = ['Morning', 'Evening', 'Night'];
    const board = new Array(shifts.length + 1);
    // Initialize the two-dimensional array
    for (let i = 0; i < shifts.length + 1; i++) {
        board[i] = new Array(days.length + 1);
    }
    // Set the top left corner to empty
    board[0][0] = '';
    // Set the first row with shift headers
    for (let i = 0; i < shifts.length; i++) {
        board[i + 1][0] = shifts[i]; // Horizontal headers
    }
    // Set the first column with day headers
    for (let j = 0; j < days.length; j++) {
        board[0][j + 1] = days[j]; // Vertical headers
    }
    // Populate the contents of the table with empty  space
    for (let i = 1; i < shifts.length + 1; i++) {
        for (let j = 1; j < days.length + 1; j++) {
            board[i][j] = [''];
        }
    }
    // Populate the contents of the table with actual shifts from the databasee
    for (const item of listShifts) {
        board[item.shift_id][item.day_id].push(employeeObject[item.employee_id]);
    }
    return (_jsxs("section", { children: [_jsx("h2", { children: "Shifts" }), board.map((row, i) => (_jsx("tr", { children: row.map((cell, j) => (_jsx("td", { children: Array.isArray(cell) ? cell.map((name, idx) => _jsx("div", { children: name }, idx)) : cell }, j))) }, i))), _jsx(RunAIScriptButton, {})] }));
};
export default ShiftsPage;
