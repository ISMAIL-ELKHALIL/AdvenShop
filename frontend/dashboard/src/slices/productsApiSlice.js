import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productID) => ({ url: `${PRODUCTS_URL}/${productID}` }),
      keepUnusedDataFor: 5,
    }),
    getProductCountByDay: builder.query({
      query: () => ({ url: `${PRODUCTS_URL}/count-by-day` }),
      keepUnusedDataFor: 5,
    }),
    getProductCountByCategory: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/products-count-by-category
      `,
      }),
      keepUnusedDataFor: 5,
    }),
    addProduct: builder.mutation({
      async queryFn(productData, _queryApi, _extraOptions, fetchWithBQ) {
        // upload with multipart/form-data
        const response = await fetchWithBQ({
          url: PRODUCTS_URL,
          method: "POST",
          body: productData,
        });
        if (response.error) throw response.error;
        return response.data
          ? { data: response.data }
          : { error: response.error };
      },
    }),
    updateProduct: builder.mutation({
      async queryFn(productData, _queryApi, _extraOptions, fetchWithBQ) {
        // upload with multipart/form-data
        const response = await fetchWithBQ({
          url: `${PRODUCTS_URL}/${productData.id}`,
          method: "PUT",
          body: productData.formData,
        });
        if (response.error) throw response.error;
        return response.data
          ? { data: response.data }
          : { error: response.error };
      },
      // Add this option to invalidate the cache of the getProductDetails query
      invalidatesTags: [{ type: "Product", id: "PRODUCT_DETAILS" }],
    }),
    deleteProduct: builder.mutation({
      query: (productID) => ({
        url: `${PRODUCTS_URL}/${productID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCountByDayQuery,
  useGetProductCountByCategoryQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
