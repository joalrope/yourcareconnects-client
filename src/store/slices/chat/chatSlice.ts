import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IChat } from "../../../interface";

const initialState: IChat = {
  connectedUsers: {},
  conversations: [
    {
      id: "",
      names: "",
      picture: { image: "", name: "", type: "" },
      info: "",
    },
  ],
  unreadCount: 0,
  chatMessages: {},
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
    setUnreadCount: (state, { payload }) => {
      state.unreadCount = payload;
    },
    setChatMessages: (state, { payload }) => {
      state.chatMessages = payload;
    },
    setAddChatMessage: (state, { payload }) => {
      const date = payload.sentTime.split("T")[0];
      const prev = JSON.parse(JSON.stringify(state.chatMessages));

      if (prev[date]) {
        prev[date].push(payload);
      } else {
        prev[date] = [payload];
      }

      state.chatMessages = prev;
    },
    setConnectedUsers: (state, { payload }) => {
      state.connectedUsers = payload;
    },
    chatOffline: () => initialState,
  },
});

export const {
  chatOffline,
  setSenderId,
  setReceiverId,
  setUnreadCount,
  setChatMessages,
  setAddChatMessage,
  setConversations,
  setRoom,
  setConnectedUsers,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.chat;
