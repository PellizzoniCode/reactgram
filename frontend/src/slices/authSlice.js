import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

import {
  registerPending,
  registerFulfilled,
  registerRejected,
  logoutFulfilled,
  loginPending,
  loginFulfilled,
  loginRejected,
} from "../cases/authCases";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  const data = await authService.login(user);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, registerPending)
      .addCase(register.fulfilled, registerFulfilled)
      .addCase(register.rejected, registerRejected)
      .addCase(logout.fulfilled, logoutFulfilled)
      .addCase(login.pending, loginPending)
      .addCase(login.fulfilled, loginFulfilled)
      .addCase(login.rejected, loginRejected);
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
