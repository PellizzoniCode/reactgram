export const profilePending = (state) => {
  state.loading = true;
  state.error = false;
};

export const profileFulfilled = (state, action) => {
  state.loading = false;
  state.error = null;
  state.success = true;
  state.user = action.payload;
};

export const updateProfilePending = (state) => {
  state.loading = true;
  state.error = false;
};

export const updateProfileFulfilled = (state, action) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.user = action.payload;
  state.message = "Perfil atualizado com sucesso!";
};

export const updateProfileRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.user = {};
};

export const getUserDetailsPending = (state) => {
  state.loading = true;
  state.error = false;
};

export const getUserDetailsFulfilled = (state, action) => {
  state.loading = false;
  state.error = null;
  state.success = true;
  state.user = action.payload;
};
