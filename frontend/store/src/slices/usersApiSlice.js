// Import the `apiSlice` and necessary constants from project files
import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

// Use `apiSlice` to create a `usersApiSlice` by injecting endpoints
const usersApiSlice = apiSlice.injectEndpoints({
  // Define API endpoints using the builder function
  endpoints: (builder) => ({
    // Define a "register" endpoint as a mutation
    register: builder.mutation({
      // Specify the query function for user registration
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        // Include user registration data in the request body
        body: data,
      }),
    }),
    // Define a "login" endpoint as a mutation
    login: builder.mutation({
      // Specify the query function for user login
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        // Include login data in the request body
        body: data,
      }),
    }),
    // Define a "logout" endpoint as a mutation
    logout: builder.mutation({
      // Specify the query function for user logout
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Extract the `useLoginMutation`, `useLogoutMutation`, and `useRegisterMutation` hooks
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateProfileMutation,
} = usersApiSlice;
