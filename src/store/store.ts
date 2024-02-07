import { configureStore } from "@reduxjs/toolkit";
import {
  formSlice,
  i18nSlice,
  uiSlice,
  userSlice,
  serviceSlice,
  providersSlice,
  userServiceSlice,
  chatSlice,
} from "./slices";
import { routerSlice } from "./slices/router/routerSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    form: formSlice.reducer,
    i18n: i18nSlice.reducer,
    providers: providersSlice.reducer,
    router: routerSlice.reducer,
    service: serviceSlice.reducer,
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    userService: userServiceSlice.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
