import {createSlice,PayloadAction} from '@reduxjs/toolkit';
import { Employee, EmployeesState } from '../interfaces/employee';
import { fetchEmployeesNames } from '../actions/employeeActions';


const initialState: EmployeesState = {
    list: [],
    loading: false,
    error: null
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
    extraReducers: (builder) => {
        builder.addCase(fetchEmployeesNames.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(fetchEmployeesNames.fulfilled, (state,action)=>{
            state.list = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchEmployeesNames.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch employees';
        })
    }
});

export const {setEmployees,addEmployee,updateEmployee,removeEmployee} = employeesSlice.actions;
export default employeesSlice.reducer;