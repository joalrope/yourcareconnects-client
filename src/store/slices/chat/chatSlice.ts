import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IChat } from "../../../interface";

const initialState: IChat = {
  sender: {
    socketId: "",
    nickname: "",
  },
  receiver: {
    id: "",
    socketId: "",
    fullname: "",
    nickname: "",
    picture: "",
    info: "",
  },
  room: "",
  conversations: [
    {
      id: "",
      name: "",
      picture: "",
      info: "",
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
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSender: (state, { payload }) => {
      state.sender = payload;
    },
    setSenderSocketId: (state, { payload }) => {
      state.sender.socketId = payload;
    },
    setReceiver: (state, { payload }) => {
      state.receiver = payload;
    },
    setReceiverSocketId: (state, { payload }) => {
      state.receiver.socketId = payload;
    },
    setReceiverId: (state, { payload }) => {
      state.receiver.id = payload;
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
  },
});

export const {
  setSender,
  setSenderSocketId,
  setReceiver,
  setReceiverId,
  setReceiverSocketId,
  setAddMessage,
  setConversations,
  setRoom,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
