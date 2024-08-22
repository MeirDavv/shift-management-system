import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import scheduleReducer from './slices/scheduleSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        employees: employeeReducer,
        schedule: scheduleReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;