import { createSlice } from "@reduxjs/toolkit";
import { InitialState, User } from "../../../types/Types";

const initialState: InitialState = {
  user: null,
  theme: true,
  modal: false,
  pin: false,
};

export const userCheckSlice = createSlice({
  name: "userCheck",
  initialState,
  reducers: {
    login: (state: InitialState, { payload }: { payload: User | null }) => {
      state.user = payload;
      localStorage.clear();
      const dataToJson: string = JSON.stringify(state.user);
      localStorage.setItem("user", dataToJson);
    },
    logout: (state: InitialState) => {
      state.user = null;
      state.pin = false;
      localStorage.clear();
    },
    changeTheme: (state: InitialState) => {
      state.theme = !state.theme;
    },
    modalOpen: (state: InitialState) => {
      state.modal = true;
    },
    modalClose: (state: InitialState) => {
      state.modal = false;
    },
    pinCheck: (state: InitialState) => {
      state.pin = true;
    },
  },
});

export const { logout, login, changeTheme, modalOpen, modalClose, pinCheck } =
  userCheckSlice.actions;
