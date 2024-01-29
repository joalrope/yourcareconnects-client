import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface II18n {
  language: string;
}

const initialState: II18n = {
  language: "esES",
};
export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setES: (state) => {
      state.language = "esES";
    },
    setUS: (state) => {
      state.language = "enUS";
    },
  },
});

export const { setUS, setES } = i18nSlice.actions;

export const selecti18n = (state: RootState) => state.i18n.language;
