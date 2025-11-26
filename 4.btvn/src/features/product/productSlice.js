import { getProducts } from "@/services/product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* InitState */
const initialState = {
    products: [],
};

/* Async Thunk */
const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const response = await getProducts();
    return response.data.items; //payload fulfilled
});

/* Slice */
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        //... --> Các thao tác đồng bộ
    },

    extraReducers: (builder) => {
        /* fulfilled */
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload
        });
    },
});
export { fetchProducts };
export default productSlice.reducer;
