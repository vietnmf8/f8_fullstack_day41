import { createSlice } from "@reduxjs/toolkit";

/* InitState */
const initialState = {
    products: [],
};

/* Slice */
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        //... --> Các thao tác đồng bộ
    },
});
export default productSlice.reducer;
