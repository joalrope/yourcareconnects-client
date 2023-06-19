import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUser {
  id: string;
  names: string;
  role: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  id: "",
  names: "",
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
      const { id, names, role, email, token } = action.payload;

      state.id = id;
      state.names = names;
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
      state.role = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setLoggedIn, logout, setRole, setClearUser } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
