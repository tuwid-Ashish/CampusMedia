import {configureStore} from '@reduxjs/toolkit';
import AuthReducers from "./AuthSlice"
export const store = configureStore({
    reducer: {
        Auth: AuthReducers,
        // Reducers
    }
})