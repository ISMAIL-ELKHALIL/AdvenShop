import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query({
      query: (orderID) => ({ url: `${ORDERS_URL}/${orderID}` }),
      keepUnusedDataFor: 5,
    }),
    getOrderCountByDay: builder.query({
      query: () => ({ url: `${ORDERS_URL}/count-by-day` }),
      keepUnusedDataFor: 5,
    }),
    updateOrderToDelivered: builder.mutation({
      query: (orderID) => ({
        url: `${ORDERS_URL}/${orderID}`,
        method: "PUT",})
      })
  }),
});

export const { useGetOrdersQuery, useGetOrderDetailsQuery, useGetOrderCountByDayQuery, useUpdateOrderToDeliveredMutation } =
ordersApiSlice;
