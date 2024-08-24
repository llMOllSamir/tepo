import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserAddress, UserState } from "../../types/sliceTypes";
import axios from "axios";

const initialState: UserState = {
  token: null,
  user: null,
  address: [],
};

type AddressResponse = {
  results: number;
  status: string;
  data: UserAddress[];
};
// get user address
export const getUserAddress = createAsyncThunk<AddressResponse>(
  "user/getUserAddress",
  async () => {
    const res = await axios.get<AddressResponse>(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res.data;
  }
);
// add user address
export const addUserAddress = createAsyncThunk<
  AddressResponse,
  Omit<UserAddress, "_id">
>("user/updateUserAddress", async (address) => {
  const res = await axios.post<AddressResponse>(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    address,
    {
      headers: {
        token: JSON.parse(localStorage.getItem("token") || ""),
      },
    }
  );
  return res.data;
});

// remove user address
export const removeAddress = createAsyncThunk<AddressResponse, string>(
  "user/removeAddress",
  async (id) => {
    const res = await axios.delete<AddressResponse>(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      {
        headers: {
          token: JSON.parse(localStorage.getItem("token") || ""),
        },
      }
    );
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.address = action.payload.data;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.address = action.payload.data;
      })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.address = action.payload.data;
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
