import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { Employee, EmployeesState } from '../interfaces/employee';

const initialState: EmployeesState = {
    list: [],
};

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers:{
        setEmployees(state, action:PayloadAction<Employee[]>){
            state.list = action.payload;
        },
        addEmployee(state, action:PayloadAction<Employee>){
            state.list.push(action.payload);
        },
        updateEmployee(state, action:PayloadAction<Employee>){
            const index = state.list.findIndex(emp => emp.id === action.payload.id);
            if (index!== -1){
                state.list[index] = action.payload;
            }
        },
        removeEmployee(state, action:PayloadAction<number>){
            state.list = state.list.filter(emp => emp.id !== action.payload);
        },
    },
});

export const {setEmployees,addEmployee,updateEmployee,removeEmployee} = employeesSlice.actions;
export default employeesSlice.reducer;