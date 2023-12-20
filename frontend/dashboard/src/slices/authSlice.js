// Import createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the auth slice
const initialState = {
  // Retrieve user information from local storage or set to null if not present
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// Create an auth slice using createSlice
const authSlice = createSlice({
  // Specify the name of the slice
  name: "auth",
  // Provide the initial state
  initialState,
  // Define reducer functions for updating state
  reducers: {
    // Reducer for setting user credentials in state and local storage
    setCredentials: (state, action) => {
      // Update user information in state
      state.userInfo = action.payload;
      // Store user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // Reducer for logging out, resetting user information in state and local storage
    logout: (state, action) => {
      // Set user information to null in state
      state.userInfo = null;
      // Remove user information from local storage
      localStorage.removeItem("userInfo");  
    },
  },
});

// Export selector function to get the entire auth slice from the Redux store
export const selectAuth = (state) => state.auth;

// Export action creators for setCredentials and logout
export const { setCredentials, logout } = authSlice.actions;

// Export the auth reducer to be used in the Redux store
export default authSlice.reducer;
