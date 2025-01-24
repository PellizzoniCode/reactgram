export const registerPending = (state) => {
  state.loading = true;
  state.error = false;
};

export const registerFulfilled = (state, action) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.user = action.payload;
};

export const registerRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.user = null;
};

export const logoutFulfilled = (state) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.user = null;
};

export const loginPending = (state) => {
  state.loading = true;
  state.error = false;
};

export const loginFulfilled = (state, action) => {
  state.loading = false;
  state.error = false;
  state.success = true;
  state.user = action.payload;
};

export const loginRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.user = null;
};
