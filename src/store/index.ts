import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { dataApi } from "../services/index.ts";
import { userCheckSlice } from "./slices/user/userCheck.ts";

export const store = configureStore({
  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    user: userCheckSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
