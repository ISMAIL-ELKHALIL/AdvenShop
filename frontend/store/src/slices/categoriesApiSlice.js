import { CATEGORIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: (builder.mutation = () => ({
      query: (data) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: data,
      }),
    })),
    // Define a "get All Categories" endpoint as a query
    getAllCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoriesApiSlice;
