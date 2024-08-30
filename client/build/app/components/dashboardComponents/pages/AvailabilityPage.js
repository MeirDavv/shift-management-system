import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnavailability, submitUnavailability } from "../../../store/actions/availabilityActions";
import { updateUnavailability } from "../../../store/slices/unavailabilitySlice";
const AvailabilityPage = () => {
    const dispatch = useDispatch();
    const { unavailability, loading, error } = useSelector((state) => state.unavailability);
    console.log("unavailability: ", unavailability);
    useEffect(() => {
        dispatch(fetchUnavailability());
    }, [dispatch]);
    const handleCheckboxChange = (shift_id, day_id) => {
        const is_unavailable = !unavailability[`${shift_id}-${day_id}`];
        dispatch(updateUnavailability({ shift_id, day_id, is_unavailable }));
    };
    const handleSubmit = () => {
        console.log("Submitting state: ", unavailability);
        dispatch(submitUnavailability());
    };
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const shifts = ['Morning', 'Evening', 'Night'];
    return (_jsxs("section", { children: [_jsx("h2", { children: "Availability" }), loading && _jsx("p", { children: "Loading..." }), error && _jsx("p", { children: error }), _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", {}), days.map((day, index) => (_jsx("th", { children: day }, index)))] }) }), _jsx("tbody", { children: shifts.map((shift, shiftIndex) => (_jsxs("tr", { children: [_jsx("td", { children: shift }), days.map((_, dayIndex) => {
                                    const key = `${shiftIndex + 1}-${dayIndex + 1}`;
                                    return (_jsx("td", { children: _jsx("input", { type: "checkbox", checked: !!unavailability[key], onChange: () => handleCheckboxChange(shiftIndex + 1, dayIndex + 1) }) }, dayIndex));
                                })] }, shiftIndex))) })] }), _jsx("button", { onClick: handleSubmit, children: "Submit Changes" })] }));
};
export default AvailabilityPage;
