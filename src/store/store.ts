import { configureStore } from "@reduxjs/toolkit";
import { i18nSlice, themeSlice, userSlice } from "./slices";

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
