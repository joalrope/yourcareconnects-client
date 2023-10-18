import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IItem } from "../../../components/ui-components/category-select/CategorySelect";

interface IUserService {
  userService: IItem[];
}

const initialState: IUserService = {
  userService: [],
};

export const userServiceSlice = createSlice({
  name: "userService",
  initialState,
  reducers: {
    setUserService: (state, { payload }) => {
      state.userService = payload;
    },
  },
});

export const { setUserService } = userServiceSlice.actions;

export const selectUserService = (state: RootState) => state.userService;
