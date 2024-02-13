import { createSlice } from "@reduxjs/toolkit";
import { InitialState, User } from "../../../types/Types";

const initialState: InitialState = {
  user: null,
  theme: true,
  modal: false,
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
    changeTheme: (state: InitialState) => {
      state.theme = !state.theme;
    },
    modalOpenClose: (state: InitialState) => {
      state.modal = !state.modal;
    },
  },
});

export const { logout, login, changeTheme, modalOpenClose } =
  userCheckSlice.actions;
