import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
        keepUnusedDataFor: 5,
      }),
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        console.log("id from api slice", data);
        if (!data.id) {
          throw new Error("Id is required for update");
        }
        return {
          url: `${CATEGORIES_URL}/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryDetailsQuery
} = categoriesApiSlice;
