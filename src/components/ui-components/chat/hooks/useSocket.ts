import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChatSocketCtx } from "../context";
import { RootState } from "../../../../store";
import {
  setAddChatMessage,
  setConnectedUsers,
  setNotifications,
  setSenderId,
} from "../../../../store/slices";
import { IChatMessage, IConnectedUsers } from "../interfaces";

export const useSocket = (
  setShowTyping: Dispatch<
    SetStateAction<{
      isTyping: boolean;
      writer: string;
    }>
  >
) => {
  const { socket } = useChatSocketCtx();
  const dispatch = useDispatch();
  const { id, names } = useSelector((state: RootState) => state.user);

  socket.connect();

  useEffect(() => {
    dispatch(setSenderId(id));

    socket.on("connect", () => {
      socket.emit("signIn", {
        id,
        names,
        socketId: socket.id,
      });
    });

    socket.on("receiveMessage", (message: IChatMessage) => {
      dispatch(setAddChatMessage(message));
    });

    socket.on("updateNotifications", (notifications: number) => {
      dispatch(setNotifications(notifications));
    });

    socket.on("unsentMessage", (message: string) => {
      console.log({ unsentMessage: message });
    });

    socket.on("connectedUsers", (connectedUsers: IConnectedUsers) => {
      //console.log({ connectedUsers });
      dispatch(setConnectedUsers(connectedUsers));
    });

    socket.on(
      "userIsTyping",
      ({ isTyping, names }: { isTyping: boolean; names: string }) => {
        setShowTyping({ isTyping, writer: names });
      }
    );

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.off("updateNotifications");
      socket.off("unsentMessage");
      socket.off("connectedUsers");
      socket.off("userIsTyping");
    };
  }, [dispatch, id, names, setShowTyping, socket]);
};
