import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUser {
  role: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  role: "customer", // or provider or admin, or superadmin
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
  },
});

export const { setLoggedIn, setRole } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
