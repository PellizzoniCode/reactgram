export const publishPhotoPending = (state) => {
  state.loading = true;
  state.error = false;
};
export const publishPhotoFulfilled = (state, action) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.photo = action.payload;
  state.photos.unshift(state.photo);
  state.message = "Foto publicada com sucesso!";
};

export const publishPhotoRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.photo = {};
};

export const getUserPhotosPending = (state) => {
  state.loading = true;
  state.error = false;
};

export const getUserPhotosFulfilled = (state, action) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.photos = action.payload;
};
