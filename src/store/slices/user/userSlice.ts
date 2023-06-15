import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IUser {
  userId: string;
  name: string;
  role: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: IUser = {
  userId: "",
  name: "",
  role: "", // customer | provider | admin | superadmin
  email: "",
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userId, name, role, email, isLoggedIn } = action.payload;

      state.userId = userId;
      state.name = name;
      state.role = role;
      state.email = email;
      state.isLoggedIn = isLoggedIn;
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    setClearUser: (state) => {
      state.userId = "";
      state.name = "";
      state.role = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, setLoggedIn, setRole, setClearUser } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
