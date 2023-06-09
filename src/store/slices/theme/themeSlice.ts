import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ITheme {
  mode: string;
}

const initialState: ITheme = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { setMode } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;
