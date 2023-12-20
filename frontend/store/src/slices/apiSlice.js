// Import necessary functions and constants from Redux Toolkit and project files
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Create a base query using fetchBaseQuery with the specified base URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Create an API slice using createApi from Redux Toolkit
export const apiSlice = createApi({
  // Provide the base query to be used for making requests
  baseQuery,
  // Define tag types for better organization and documentation
  tagTypes: ["Product", "Order", "User","Category"],
  // Define API endpoints using the builder function
  endpoints: (builder) => ({
    // Add your API endpoints here using the builder
    // For example:
    // endpointName: builder.query({
    //   query: (/* args */) => /* function to make the request */,
    // }),
  }),
});
