import { IChatMessage } from "../../../../interface";

declare namespace ChatSocket {
  interface EmitEvents {
    signIn: (info: {
      id: string | undefined;
      names: string | undefined;
      socketId: string | undefined;
    }) => void;
    joinRoom: (room: string) => void;
    userIsTyping: ({ isTyping: boolean, names: string }) => void;
    sendMessage: (message: {
      message: string;
      sentTime: string;
      sender: string;
      direction: string;
      position: number | string;
    }) => void;
  }

  interface ListenEvents {
    connectedUsers: (connectedUsers: IConnectedUsers) => void;
    receiveMessage: (message: IChatMessage) => void;
    signIn: (info: IConnectedUsers) => void;
    connect: () => void;
    unsentMessage: (message: string) => void;
    userIsTyping: ({ isTyping: boolean, names: string }) => void;
    updateNotifications: (notifications: number) => void;
  }
}
