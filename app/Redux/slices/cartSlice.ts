import { Product } from "@/app/types/productsTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartProduct, CartState } from "../../types/sliceTypes";

const initialState: CartState = {
  cartList: [],
  numOfCartItems: null,
  totalCartPrice: 0,
  status: {
    loading: false,
    status: "idle",
    product: null,
  },
  error: null,
};

type CartResponse = {
  status: string;
  numOfCartItems: number;
  data: {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    totalCartPrice: number;
  };
};

export const getCart = createAsyncThunk<CartResponse>(
  "cart/getCart",
  async () => {
    const res = await axios.get<CartResponse>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res?.data;
  }
);

export const addToCart = createAsyncThunk<CartResponse, string>(
  "cart/addToCart",
  async (productId) => {
    const res = await axios.post<CartResponse>(
      "https://ecommerce.routemisr.com/api/v1/cart",
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

export const removeFromCart = createAsyncThunk<CartResponse, string>(
  "cart/removeFromCart",
  async (productId) => {
    const res = await axios.delete<CartResponse>(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res.data;
  }
);

export const updateCart = createAsyncThunk<
  CartResponse,
  { count: number; productId: string }
>("cart/updateCart", async ({ count, productId }) => {
  const res = await axios.put<CartResponse>(
    "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
    {
      count,
    },
    {
      headers: {
        token: JSON.parse(localStorage.getItem("token") || ""),
      },
    }
  );
  return res.data;
});

export const clearCart = createAsyncThunk<{ message: string }>(
  "cart/clearCart",
  async () => {
    const res = await axios.delete<{ message: string }>(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res.data;
  }
);

export const userCart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    emptyCart: (state) => {
      state.cartList = [];
      state.numOfCartItems = null;
      state.totalCartPrice = 0;
    },
  },
  extraReducers: (builder) => {
    // Add to cart request
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.status = {
          loading: true,
          status: "pending",
          product: action.meta.arg,
        };
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = {
          loading: false,
          status: "success",
          product: action.meta.arg,
        };
        state.cartList = action?.payload?.data?.products;
        state.numOfCartItems = action?.payload?.numOfCartItems;
        state.totalCartPrice = action?.payload?.data?.totalCartPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = {
          loading: false,
          status: "failed",
          product: null,
        };
        state.error = action?.error?.message as string;
      });
    // Get cart request
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.numOfCartItems = action.payload.numOfCartItems;
        state.cartList = action.payload.data.products;
        state.totalCartPrice = action.payload.data.totalCartPrice;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.numOfCartItems = null;
        state.cartList = [];
      });
    // Remove from cart request
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.numOfCartItems = action.payload.numOfCartItems;
      state.cartList = action.payload.data.products;
      state.totalCartPrice = action.payload.data.totalCartPrice;
    });
    // Update cart request
    builder
      .addCase(updateCart.fulfilled, (state, action) => {
        state.numOfCartItems = action.payload.numOfCartItems;
        state.cartList = action.payload.data.products;
        state.totalCartPrice = action.payload.data.totalCartPrice;
        state.error = null;
        state.status.loading = false;
        state.status.status = "success";
        state.status.product = null;
      })
      .addCase(updateCart.pending, (state, action) => {
        state.error = null;
        state.status.loading = true;
        state.status.status = "pending";
        state.status.product = action.meta.arg.productId;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action?.error?.message as string;
        state.status.loading = false;
        state.status.status = "failed";
        state.status.product = null;
      });
    // Clear cart request
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.numOfCartItems = null;
      state.cartList = [];
      state.totalCartPrice = 0;
    });
  },
});
export const { emptyCart } = userCart.actions;

export default userCart.reducer;
