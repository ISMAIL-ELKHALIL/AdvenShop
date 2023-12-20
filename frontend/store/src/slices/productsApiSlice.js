// Import necessary constants and the `apiSlice` from project files
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Use `apiSlice` to create a `productsApiSlice` by injecting endpoints
export const productsApiSlice = apiSlice.injectEndpoints({
  // Define API endpoints using the builder function
  endpoints: (builder) => ({
    // Define a "getProducts" endpoint as a query
    getProducts: builder.query({
      // Specify the query function for fetching products
      query: () => ({
        url: PRODUCTS_URL,
      }),
      // Optionally specify a duration to keep unused data in the cache
      keepUnusedDataFor: 5,
    }),
    // Define a "getProductDetails" endpoint as a query
    getProductDetails: builder.query({
      // Specify the query function for fetching details of a specific product
      query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}` }),
      // Optionally specify a duration to keep unused data in the cache
      keepUnusedDataFor: 5,
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    filterProducts: builder.query({
      query: (filterOption) => ({
        url: `${PRODUCTS_URL}/filter`,
        params: filterOption,
      
      }),
      keepUnusedDataFor: 2,
  
    }),
  }),
});

// Extract the `useGetProductsQuery` and `useGetProductDetailsQuery` hooks
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
  useFilterProductsQuery,
} = productsApiSlice;
