import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

import {
  getUserDetailsFulfilled,
  getUserDetailsPending,
  profileFulfilled,
  profilePending,
  updateProfileFulfilled,
  updateProfilePending,
  updateProfileRejected,
} from "../cases/userCases";

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);

    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "user/get",
  async (id, thunkAPI) => {
    const data = await userService.getUserDetails(id);

    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, profilePending)
      .addCase(profile.fulfilled, profileFulfilled)
      .addCase(updateProfile.pending, updateProfilePending)
      .addCase(updateProfile.fulfilled, updateProfileFulfilled)
      .addCase(updateProfile.rejected, updateProfileRejected)
      .addCase(getUserDetails.pending, getUserDetailsPending)
      .addCase(getUserDetails.fulfilled, getUserDetailsFulfilled);
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
