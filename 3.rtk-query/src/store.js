import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { productApi } from "./services/product";

const store = configureStore({
    reducer: {
        product: productReducer,
        [productApi.reducerPath]: productApi.reducer,
        //... --> Thêm nhiều ở đây
    },
    middleware: (getDefaultMiddleware) => [
        // getDefaultMiddleware().concat(productApi.middleware),
        ...getDefaultMiddleware(),
        productApi.middleware,
        //... --> Thêm nhiều ở đây
    ],
});

window.store = store;

export { store };
