import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import shiftReducer from './slices/shiftSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        employees: employeeReducer,
        shifts: shiftReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;