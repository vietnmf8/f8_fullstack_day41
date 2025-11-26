import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";

/* Create Store */
const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

window.store = store;

export { store };
