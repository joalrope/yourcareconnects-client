import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface i18nState {
  value: string;
}

export const i18nSlice = createSlice({
  name: "i18n",
  initialState: {
    value: "enES",
  } as i18nState,
  reducers: {
    useES: (state) => {
      state.value = "esES";
    },
    useUS: (state) => {
      state.value = "enUS";
    },
  },
});

export const { useUS, useES } = i18nSlice.actions;

export const selecti18n = (state: RootState) => state.i18n.value;

export default i18nSlice.reducer;
