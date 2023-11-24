import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { ChatSocket } from "./chatSocket";

export type MyChatSocket = Socket<
  ChatSocket.ListenEvents,
  ChatSocket.EmitEvents
>;

export interface ChatSocketCtxState {
  socket: MyChatSocket;
}

export const ChatSocketCtx = createContext<ChatSocketCtxState>(
  {} as ChatSocketCtxState
);

export const useChatSocketCtx = () => useContext(ChatSocketCtx);
