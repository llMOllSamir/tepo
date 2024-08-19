import { Product } from "@/app/types/productsTypes";
import { ProductState } from "@/app/types/sliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  productList: [],
};

type ProductResponse = {
  data: Product[];
};

export let getProducts = createAsyncThunk<ProductResponse, number>(
  "product/getProducts",
  async (page = 1) => {
    let data = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
    ).then(async (res) => await res.json());
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export default productSlice.reducer;
