import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IChat } from "../../../interface";

const initialState: IChat = {
  socketId: "",
  sender: "",
  receiver: "",
  room: "",
  message: "",
  messages: [],
  contacts: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSocketId: (state, { payload }) => {
      state.socketId = payload;
    },
    setSender: (state, { payload }) => {
      state.sender = payload;
    },
    setReceiver: (state, { payload }) => {
      state.receiver = payload;
    },
    setRoom: (state, { payload }) => {
      state.room = payload;
    },
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
    setContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setAddMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
});

export const { setSocketId, setSender, setReceiver, setRoom, setMessage } =
  chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
