import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShiftSettings, updateShiftSettingsAction } from "../../../store/actions/shiftSettingsActions";
const SettingsPage = () => {
    const dispatch = useDispatch();
    const { list: shiftSettings } = useSelector((state) => state.shiftSettings);
    const [formValues, setFormValues] = useState([]);
    useEffect(() => {
        dispatch(fetchShiftSettings());
    }, [dispatch]);
    useEffect(() => {
        setFormValues(shiftSettings);
    }, [shiftSettings]);
    const handleChange = (index, field, value) => {
        const updatedFormValues = [...formValues];
        const currentShift = updatedFormValues[index];
        if (field === "min_employee_count") {
            const minValue = parseInt(value);
            if (minValue <= currentShift.max_employee_count) {
                updatedFormValues[index] = { ...currentShift, min_employee_count: minValue };
            }
            else {
                alert("Min Employee Count can't be greater than Max Employe Count");
                return;
            }
        }
        else if (field === "max_employee_count") {
            const maxValue = parseInt(value);
            if (maxValue >= currentShift.min_employee_count) {
                updatedFormValues[index] = { ...currentShift, max_employee_count: maxValue };
            }
            else {
                alert("Max Employee Count can't be smaller than Min Employe Count");
                return;
            }
        }
        else {
            updatedFormValues[index] = { ...updatedFormValues[index], [field]: value };
        }
        setFormValues(updatedFormValues);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        formValues.forEach(shift => dispatch(updateShiftSettingsAction({ shiftSettings: shift })));
    };
    return (_jsxs("section", { children: [_jsx("h2", { children: "Settings" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("table", { children: [_jsxs("thead", { children: [_jsx("td", { children: "Shift" }), _jsx("td", { children: "Start Time" }), _jsx("td", { children: "End Time" }), _jsx("td", { children: "Min Employee Count" }), _jsx("td", { children: "Max Employe Count" })] }), _jsx("tbody", { children: formValues.map((row, i) => (_jsxs("tr", { children: [_jsxs("td", { children: [row.name, " Shift:"] }), _jsx("td", { children: _jsx("input", { required: true, type: "time", value: row.start_time, onChange: (e) => handleChange(i, "start_time", e.target.value) }) }), _jsx("td", { children: _jsx("input", { required: true, type: "time", value: row.end_time, onChange: (e) => handleChange(i, "end_time", e.target.value) }) }), _jsx("td", { children: _jsx("input", { required: true, type: "number", value: row.min_employee_count, onChange: (e) => handleChange(i, "min_employee_count", e.target.value) }) }), _jsx("td", { children: _jsx("input", { required: true, type: "number", value: row.max_employee_count, onChange: (e) => handleChange(i, "max_employee_count", e.target.value) }) })] }, i))) })] }), _jsx("button", { type: "submit", children: "Save Changes" })] })] }));
};
export default SettingsPage;
