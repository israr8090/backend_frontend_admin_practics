import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import employeeReducer from './slices/employeeSlice';

export const store = configureStore({
    // Add reducers here
    reducer: {
        user: userReducer,
        employeesList: employeeReducer,
    }
});