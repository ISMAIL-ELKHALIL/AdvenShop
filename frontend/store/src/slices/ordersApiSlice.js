// Import the `apiSlice` and necessary constants from project files
import { apiSlice } from "./apiSlice.js";
import { ORDERS_URL, PAYPAL_URL } from "../constants.js";

// Use `apiSlice` to create an `ordersApiSlice` by injecting endpoints
export const ordersApiSlice = apiSlice.injectEndpoints({
  // Define API endpoints using the builder function
  endpoints: (builder) => ({
    // Define a "createOrder" endpoint as a mutation
    createOrder: builder.mutation({
      // Specify the query function for creating an order
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        // Include the order data in the request body
        body: { ...order },
      }),
    }),

    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// Extract the `useCreateOrderMutation` hook from the `ordersApiSlice`
export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
} = ordersApiSlice;
