/* RTK Query
- Đặt tên file theo NAMESPACE
*/
// 1. import createApi
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        createProduct: builder.mutation({
            // Những hành động: Thêm/sửa/xoá => mutation
            query: (body) => ({
                url: "/products",
                method: "POST",
                body,
                headers: {
                    Authorization: "Bearer <token>",
                },
            }),
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;
