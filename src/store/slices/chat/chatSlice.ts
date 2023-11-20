import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IChat } from "../../../interface";

const initialState: IChat = {
  connectedUsers: {},
  conversations: [
    {
      id: "",
      names: "",
      picture: "",
      info: "",
      socketId: "",
    },
  ],
  messages: [
    {
      senderId: "",
      receiverId: "",
      type: "",
      content: {},
      sentTime: String(new Date()),
      readTime: String(new Date()),
      direction: "",
      position: "",
    },
  ],
  receiverId: "",
  room: "",
  senderId: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReceiverId: (state, { payload }) => {
      state.receiverId = payload;
    },
    setSenderId: (state, { payload }) => {
      state.senderId = payload;
    },
    setRoom: (state, { payload }) => {
      state.room = payload;
    },
    setConversations: (state, { payload }) => {
      state.conversations = payload;
    },
    setAddMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    setConnectedUsers: (state, { payload }) => {
      state.connectedUsers = payload;
    },
  },
});

export const {
  setSenderId,
  setReceiverId,
  setAddMessage,
  setConversations,
  setRoom,
  setConnectedUsers,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
