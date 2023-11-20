import { ReactNode, useRef } from "react";
import { io } from "socket.io-client";
import { ChatSocketCtx, MyChatSocket } from "./index";

const baseUrl = import.meta.env.VITE_URL_BASE;

const ChatSocketCtxProvider = (props: { children?: ReactNode }) => {
  const socketRef = useRef<MyChatSocket>(
    io(baseUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 10,
    })
  );

  return (
    <ChatSocketCtx.Provider value={{ socket: socketRef.current }}>
      {props.children}
    </ChatSocketCtx.Provider>
  );
};

export default ChatSocketCtxProvider;
