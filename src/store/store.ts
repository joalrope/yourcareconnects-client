import { configureStore } from "@reduxjs/toolkit";
import {
  formSlice,
  i18nSlice,
  uiSlice,
  userSlice,
  serviceSlice,
  userServiceSlice,
  chatSlice,
} from "./slices";
import { routerSlice } from "./slices/router/routerSlice";

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    ui: uiSlice.reducer,
    router: routerSlice.reducer,
    form: formSlice.reducer,
    service: serviceSlice.reducer,
    userService: userServiceSlice.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
