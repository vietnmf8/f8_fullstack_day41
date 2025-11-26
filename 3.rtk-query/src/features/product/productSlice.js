import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    value: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increase(state) {
            state.value++;
        },
    },
});

export const { increase } = productSlice.actions;
export default productSlice.reducer;
