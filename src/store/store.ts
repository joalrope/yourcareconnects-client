import { configureStore } from "@reduxjs/toolkit";
import {
  formSlice,
  i18nSlice,
  themeSlice,
  userSlice,
  serviceSlice,
} from "./slices";
import { routerSlice } from "./slices/router/routerSlice";

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
    theme: themeSlice.reducer,
    router: routerSlice.reducer,
    form: formSlice.reducer,
    service: serviceSlice.reducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
