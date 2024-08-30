import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import shiftReducer from './slices/shiftSlice';
import unavailabilityReducer from './slices/unavailabilitySlice';
import roleReducer from './slices/roleSlice';
import shiftSettingsReducer from './slices/shiftSettingsSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        employees: employeeReducer,
        shifts: shiftReducer,
        unavailability: unavailabilityReducer,
        roles: roleReducer,
        shiftSettings: shiftSettingsReducer
    },
});
export default store;
