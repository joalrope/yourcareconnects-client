import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IRouter {
  locationPath: string;
}

const initialState: IRouter = {
  locationPath: "/",
};
export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    setLocationPath: (state, { payload }) => {
      state.locationPath = `${payload}`;
    },
  },
});

export const { setLocationPath } = routerSlice.actions;

export const selectRouter = (state: RootState) => state.router.locationPath;
