import { Category } from "@/app/types/productsTypes";
import { CategoryState } from "@/app/types/sliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CategoryState = {
  categoriesList: [],
};

type CategoryResponse = {
  data: Category[];
};
/** get  All categories   */
export const getCategories = createAsyncThunk<CategoryResponse>(
  "category/getCategories",
  async () => {
    const res = await axios.get<CategoryResponse>(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, actions) => {
      state.categoriesList = actions.payload.data;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
