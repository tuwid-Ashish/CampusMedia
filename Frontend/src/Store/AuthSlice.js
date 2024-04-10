import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    Experience:null,
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
         addExperience: (state, action) => {
            state.Experience = action.payload;
    },
    }
})

export const {login, logout, addExperience} = AuthSlice.actions;
export default AuthSlice.reducer;
