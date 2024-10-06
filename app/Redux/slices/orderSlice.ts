import { OrderType } from "@/app/types/sliceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Order = {
  cartId: string | null;
  payMethod: "cash" | "card" | null;
  orderAddress: { details: string; phone: string; city: string } | null;
  allOrders: OrderType[];
};

const initialState: Order = {
  cartId: null,
  payMethod: null,
  orderAddress: null,
  allOrders: [],
};

type OrderRequest = {
  address: {
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    } | null;
  };
  cartId: string;
};

type CashOrderResponse = {
  status: string;
};
export const cashOrder = createAsyncThunk(
  "order/cashOrder",
  async ({ address, cartId }: OrderRequest) => {
    const res = await axios.post<CashOrderResponse>(
      "https://ecommerce.routemisr.com/api/v1/orders/" + cartId,
      address,
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res?.data;
  }
);

type CardOrderResponse = {
  message: string;
  session: {
    url: string;
    success_url: string;
    cancel_url: string;
  };
};

export const cardOrder = createAsyncThunk(
  "order/cardOrder",
  async ({ address, cartId }: OrderRequest) => {
    const res = await axios.post<CardOrderResponse>(
      "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
        cartId,
      address,
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res?.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setPayMethod: (state, action) => {
      state.payMethod = action.payload;
    },
    setOrderAddress: (
      state,
      action: {
        payload: { details: string; phone: string; city: string } | null;
      }
    ) => {
      state.orderAddress = action.payload;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cashOrder.fulfilled, (state, action) => {
        state.cartId = null;
        state.payMethod = null;
        state.orderAddress = null;
      })
      .addCase(cardOrder.fulfilled, (state, action) => {
        state.cartId = null;
        state.payMethod = null;
        state.orderAddress = null;
      });
  },
});

export const { setOrderAddress, setPayMethod, setCartId, setAllOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
