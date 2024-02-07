import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IProvider } from "../../../interface/provider";

const initialState: IProvider[] = [];

export const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setProviders: (state, action) => {
      state.splice(0, state.length);
      state.push(...action.payload);
    },
    setClearProviders: (state) => {
      state.splice(0, state.length);
    },
    addProvider: (state, action) => {
      state.push(action.payload);
    },
    deleteProvider: (state, action) => {
      return state.filter((provider) => provider.id !== action.payload);
    },
  },
});

export const { setProviders, setClearProviders, deleteProvider, addProvider } =
  providersSlice.actions;

export const selectProviders = (state: RootState) => state.providers;
