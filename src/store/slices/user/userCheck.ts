import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userCheckSlice = createSlice({
  name: "userCheck",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
      localStorage.clear();
      const dataToJson = JSON.stringify(state.user);
      localStorage.setItem("user", dataToJson);
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { logout, login } = userCheckSlice.actions;
