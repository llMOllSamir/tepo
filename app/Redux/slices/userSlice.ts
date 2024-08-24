import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserAddress, UserState } from "../../types/sliceTypes";
import axios, { AxiosError } from "axios";

const initialState: UserState = {
  token: null,
  user: null,
  address: [],
  status: "idle",
  error: null,
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

type AuthResponse = {
  token: string;
  user: User;
};
// login function
export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: AxiosError<{ message: string }> }
>("user/loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post<AuthResponse>(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      data
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError<{ message: string }>);
  }
});

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
// register function
export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterRequest,
  { rejectValue: AxiosError<{ message: string }> }
>("user/registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post<AuthResponse>(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      data
    );
    return res.data;
  } catch (error) {
    return rejectWithValue(error as AxiosError<{ message: string }>);
  }
});

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
      state.status = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "success";
        state.error = null;
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = "failed";
        state.error = action.payload?.response?.data?.message || null;
      });

    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.response?.data?.message || null;
      });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
