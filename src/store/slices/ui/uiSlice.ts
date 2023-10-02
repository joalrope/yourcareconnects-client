import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUi {
  theme: string;
  loading: boolean;
}

const initialState: IUi = {
  theme: "light",
  loading: false,
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
  },
});

export const { setTheme, setLoading } = uiSlice.actions;

export const selectUi = (state: RootState) => state.ui;
