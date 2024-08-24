import { Product } from "@/app/types/productsTypes";
import { WishListState } from "@/app/types/sliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: WishListState = {
  count: 0,
  wishList: [],
};

type WishListResponse = {
  count: number;
  data: Product[];
};

type ToggleWishListResponse = {
  message: string;
  data: string[];
};

export const getWishList = createAsyncThunk<WishListResponse>(
  "wishlist/getCart",
  async () => {
    const res = await axios.get<WishListResponse>(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res?.data;
  }
);

export const addToWishList = createAsyncThunk<ToggleWishListResponse, string>(
  "wishlist/addToWishList",
  async (productId) => {
    const res = await axios.post<ToggleWishListResponse>(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res.data;
  }
);

export const removeFromWishList = createAsyncThunk<
  ToggleWishListResponse,
  string
>("wishlist/removeFromWishList", async (productId) => {
  const res = await axios.delete<ToggleWishListResponse>(
    "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
    {
      headers: {
        token: JSON.parse(localStorage.getItem("token") || ""),
      },
    }
  );
  return res.data;
});

export const userWishList = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    emptyWishlist: (state) => {
      state.wishList = [];
      state.count = 0;
    }
  },
  extraReducers: (builder) => {
    // Add to cart request
    builder.addCase(addToWishList.fulfilled, (state, action) => {
      state.wishList = action.payload.data;
      state.count = action.payload.data.length;
    });
    // Get cart request
    builder.addCase(getWishList.fulfilled, (state, action) => {
      state.wishList = action.payload.data.map((item) => item._id);
      state.count = action.payload.count;
    });
    // Remove from cart request
    builder.addCase(removeFromWishList.fulfilled, (state, action) => {
      state.wishList = action.payload.data;
      state.count = action.payload.data.length;
    });
  },
});
export const {emptyWishlist} = userWishList.actions;

export default userWishList.reducer;
