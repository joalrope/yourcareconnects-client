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
    updateActiveProvStatus: (state, action) => {
      const index = state.findIndex(
        (provider) => provider.id === action.payload.id
      );
      if (index !== -1) {
        state[index].isActive = action.payload.isActive;
        return state;
      }
    },
    updateDeletedProvStatus: (state, action) => {
      const index = state.findIndex(
        (provider) => provider.id === action.payload.id
      );
      if (index !== -1) {
        state[index].isDeleted = action.payload.isDeleted;
        return state;
      }
    },
    updateProviderRatings: (state, action) => {
      const index = state.findIndex(
        (provider) => provider.id === action.payload.id
      );
      if (index !== -1) {
        state[index].ratings = action.payload.ratings;
        return state;
      }
    },
  },
});

export const {
  addProvider,
  deleteProvider,
  updateActiveProvStatus,
  updateDeletedProvStatus,
  updateProviderRatings,
  setClearProviders,
  setProviders,
} = providersSlice.actions;

export const selectProviders = (state: RootState) => state.providers;
