import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IRouter {
  locationPath: string;
  collapsed: boolean;
}

const initialState: IRouter = {
  locationPath: "/",
  collapsed: false,
};
export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setLocationPath: (state, { payload }) => {
      state.locationPath = `${payload}`;
    },
    setCollapsed: (state, { payload }) => {
      state.collapsed = payload;
    },
  },
});

export const { setLocationPath, setCollapsed } = routerSlice.actions;

export const selectRouter = (state: RootState) => state.router.locationPath;
