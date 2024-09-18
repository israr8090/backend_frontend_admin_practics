import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//--
const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        message: null,
        isUpdated: false,
        error: null,
    },

    //--
    reducers: {
        //--Register User--
        registerUserRequest: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.message = action.payload;
            state.error = null;
        },
        registerUserFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Login User--
        loginUserRequest: (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.message = action.payload;
            state.error = null;
        },
        loginUserFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Load User--
        loadUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },

        //--Logout User--
        logoutUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        logoutUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = action.payload;
            state.error = null;
        },
        logoutUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = action.payload;
        },

        //--Update User Password--
        updateUserPasswordRequest(state, actione) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateUserPasswordSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateUserPasswordFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        //--Update User Profile--
        updateProfileRequest(state, action) {
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        //--update Profile Reset After Update--
        updateProfileResetAfterUpdate(state, action) {
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },

        //--Clear All Errors--
        clearAllErrors(state) {
            state.error = null;
            state.user = state.user
        },
    }
});

//-------------Action Creators------------
//--register User--
export const registerUser = (userName, email, password) => async (dispatch) => {
};

//--login User--
export const loginUser = (userName, password) => async (dispatch) => {

    dispatch(userSlice.actions.loginUserRequest())  //--

    try {
        //--post request
        const { data } = await axios.post(
            "http://localhost:4000/api/user/login",  //--
            { userName, password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
        )

        // console.log(data)

        dispatch(userSlice.actions.loginUserSuccess(data.user))  //--
        dispatch(userSlice.actions.clearAllErrors())  //--

    } catch (error) {
        dispatch(userSlice.actions.loginUserFailed(error.response.data.message))  //--
    }
};

//--get User
export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest())  //--

    try {
        //--
        const { data } = await axios.get(            
            "http://localhost:4000/api/user/me",  //--
            { withCredentials: true }
        );

        dispatch(userSlice.actions.loadUserSuccess(data.user))  //--
        dispatch(userSlice.actions.clearAllErrors())  //--

    } catch (error) {
        dispatch(userSlice.actions.loadUserFailed(error.response.data.message))  //--
    }
};

//--logout User--
export const logoutUser = () => async (dispatch) => {
    dispatch(userSlice.actions.logoutUserRequest())  //--

    try {
        const {data} = await axios.get(
            "http://localhost:4000/api/user/logout",
            { withCredentials: true }
        )

        dispatch(userSlice.actions.logoutUserSuccess(data.message))  //--
        dispatch(userSlice.actions.clearAllErrors())  //--
        
    } catch (error) {
        dispatch(userSlice.actions.logoutUserFailed(error.response.data.message))  //--
    }
};

//--Clear All User Errors--
export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

//--export default--
export default userSlice.reducer;