import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeesNames } from '../actions/employeeActions';
const initialState = {
    list: [],
    loading: false,
    error: null
};
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees(state, action) {
            state.list = action.payload;
        },
        addEmployee(state, action) {
            state.list.push(action.payload);
        },
        updateEmployee(state, action) {
            const index = state.list.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        updateRoleEmployee(state, action) {
            const index = state.list.findIndex(emp => emp.id === action.payload.employeeId);
            if (index !== -1) {
                state.list[index].role_id = action.payload.roleId;
            }
        },
        removeEmployee(state, action) {
            state.list = state.list.filter(emp => emp.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeesNames.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchEmployeesNames.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchEmployeesNames.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch employees';
        });
    }
});
export const { setEmployees, addEmployee, updateEmployee, removeEmployee, updateRoleEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
