import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    profile:null,
    user: null,
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
         addprofile: (state, action) => {
            state.profile = action.payload;
    },
    }
})

export const {login, logout, addprofile} = AuthSlice.actions;
export default AuthSlice.reducer;
