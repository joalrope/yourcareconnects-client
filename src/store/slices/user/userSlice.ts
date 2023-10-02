import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IUser } from "../../../interface";

const initialState: IUser = {
  id: "",
  names: "",
  balance: 0.1,
  biography: "",
  notifications: 0,
  points: 0,
  services: [],
  role: "", // customer | provider | admin | superadmin
  email: "",
  isLoggedIn: false,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        id,
        names,
        balance,
        biography,
        notifications,
        points,
        services,
        role,
        email,
        token,
        isLoggedIn,
      } = action.payload;

      state.id = id;
      state.names = names;
      state.balance = balance;
      state.biography = biography;
      state.notifications = notifications;
      state.points = points;
      state.services = services;
      state.role = role;
      state.email = email;
      state.token = token;
      state.isLoggedIn = isLoggedIn;
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    logout: () => initialState,
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setClearUser: (state) => {
      state.id = "";
      state.names = "";
      state.balance = 0.1;
      state.biography = "";
      state.notifications = 0;
      state.points = 0;
      state.services = [];
      state.role = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setLoggedIn, logout, setRole, setClearUser } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
