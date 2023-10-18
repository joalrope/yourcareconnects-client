import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IItem } from "../../../components/ui-components/category-select/CategorySelect";

interface IService {
  newService: string;
  pathNewService: string;
  data: IItem[];
}

const initialState: IService = {
  newService: "",
  pathNewService: "",
  data: [],
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setNewService: (state, { payload }) => {
      state.newService = payload;
    },
    /*setServiceFormHide: (state) => {
      state.serviceForm.show = false;
    },*/
    setPathNewService: (state, { payload }) => {
      state.pathNewService = payload;
    },
  },
});

// eslint-disable-next-line no-empty-pattern
export const { setNewService, setPathNewService /*setServiceFormMode*/ } =
  serviceSlice.actions;

export const selectService = (state: RootState) => state.service;
