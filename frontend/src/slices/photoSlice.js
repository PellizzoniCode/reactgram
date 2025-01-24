import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

import {
  publishPhotoPending,
  publishPhotoFulfilled,
  publishPhotoRejected,
  getUserPhotosPending,
  getUserPhotosFulfilled,
} from "../cases/photoCases";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  "photo/publishPhoto",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPhotos = createAsyncThunk(
  "photo/userPhotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);

    return data;
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishPhoto.pending, publishPhotoPending)
      .addCase(publishPhoto.fulfilled, publishPhotoFulfilled)
      .addCase(publishPhoto.rejected, publishPhotoRejected)
      .addCase(getUserPhotos.pending, getUserPhotosPending)
      .addCase(getUserPhotos.fulfilled, getUserPhotosFulfilled);
  },
});

export const { resetMessage } = photoSlice.actions;

export default photoSlice.reducer;
