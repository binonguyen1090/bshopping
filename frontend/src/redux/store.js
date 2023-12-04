import { MiddlewareArray, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi, useGetProductsQuery } from "./api/productsApi";


export const store = configureStore({
    reducer: {
        [productApi.reducerPath] : productApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat([productApi.middleware])
})