import { createSlice } from "@reduxjs/toolkit";
import { InitialState, User } from "../../../types/Types";

const initialState: InitialState = {
  user: null,
};

export const userCheckSlice = createSlice({
  name: "userCheck",
  initialState,
  reducers: {
    login: (state: InitialState, { payload }: { payload: User }) => {
      state.user = payload;
      localStorage.clear();
      const dataToJson: string = JSON.stringify(state.user);
      localStorage.setItem("user", dataToJson);
    },
    logout: (state: InitialState) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { logout, login } = userCheckSlice.actions;
