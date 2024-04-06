import {createSlice} from '@reduxjs/toolkit';
import { add } from 'date-fns';

const initialState = {
    status: false,
    user: null,
    Exprience:null,
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = action.payload?._id?true:false;
            state.user = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
        },
        addExprience: (state, action) => {
            state.Exprience = action.payload;
        }
    }
})

export const {login, logout, addExprience} = AuthSlice.actions;
export default AuthSlice.reducer;
