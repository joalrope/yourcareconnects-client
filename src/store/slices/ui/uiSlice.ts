import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUi {
  theme: string;
  loading: boolean;
  isOpened?: boolean;
}

const initialState: IUi = {
  theme: "light",
  loading: false,
  isOpened: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setIsOpened: (state, { payload }) => {
      state.isOpened = payload;
    },
  },
});

export const { setTheme, setLoading, setIsOpened } = uiSlice.actions;

export const selectUi = (state: RootState) => state.ui;
