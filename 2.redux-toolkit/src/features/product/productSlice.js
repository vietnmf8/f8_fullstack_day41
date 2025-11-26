import { getProducts } from "@/services/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    value: 0,
};

const fetchProducts = createAsyncThunk("product/fetchProducts", async () => {
    const response = await getProducts();
    return response.data.items;
});

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        increase(state) {
            state.value++;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export { fetchProducts };
export const { increase } = productSlice.actions;
export default productSlice.reducer;
