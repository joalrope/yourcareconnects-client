import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface IForm {
  show: boolean;
  mode?: string;
}

interface IFormState {
  serviceForm: IForm;
}

const initialState: IFormState = {
  serviceForm: {
    show: false,
    mode: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setServiceFormVisible: (state) => {
      state.serviceForm.show = true;
    },
    setServiceFormHide: (state) => {
      state.serviceForm.show = false;
    },
    setServiceFormMode: (state, { payload }) => {
      state.serviceForm.mode = payload;
    },
  },
});

export const { setServiceFormVisible, setServiceFormHide, setServiceFormMode } =
  formSlice.actions;

export const selectForm = (state: RootState) => state.form;
