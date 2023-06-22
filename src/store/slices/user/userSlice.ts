import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUser {
  id: string;
  names: string;
  balance: number;
  points: number;
  role: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  id: "",
  names: "",
  balance: 0.1,
  points: 0,
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
      const { id, names, balance, points, role, email, token } = action.payload;

      state.id = id;
      state.names = names;
      state.balance = balance;
      state.points = points;
      state.role = role;
      state.email = email;
      state.token = token;
      state.isLoggedIn = true;
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
      state.points = 0;
      state.role = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setLoggedIn, logout, setRole, setClearUser } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
