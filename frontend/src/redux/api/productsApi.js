import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Product", "AdminProducts"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          page:params?.page,
          keyword:params?.keyword,
          "price[gte]":params.min,
          "price[lte]":params.max,
          category:params?.category,
          "ratings[gte]":params.max,

        }
      
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/reviews",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    canUserReview: builder.query({
      query: (productId) => `/can_review/?productId=${productId}`,
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/products`,
      invalidatesTags: ["AdminProducts"],

    }),

    createProduct: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Product","AdminProduct"],
    }),

    updateProduct: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product", "AdminProducts"],
    }),

    uploadProductImages: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload_images`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),


    deleteProductImage: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete_image`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),


    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Product","AdminProducts"],
    }),

    getProductReviews: builder.query({
      query: (productId) => `/reviews?id=${productId}`,
      providesTags: ["Reviews"],
    }),

    deleteReview: builder.mutation({
      query({ productId, id }) {
        return {
          url: `/admin/reviews?productId=${productId}&id=${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Reviews"],
    }),

  }),
});

export const { useGetProductsQuery , useGetProductDetailsQuery, useSubmitReviewMutation, useCanUserReviewQuery,
useGetAdminProductsQuery,useCreateProductMutation, useUpdateProductMutation, useUploadProductImagesMutation,
useDeleteProductImageMutation, useDeleteProductMutation,
useLazyGetProductReviewsQuery, useDeleteReviewMutation } = productApi;


