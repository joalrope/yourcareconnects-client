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
      senderId: string;
      receiverId: string;
      room: string;
      message: string;
      time: Date;
    }) => void;
  }

  interface ListenEvents {
    connectedUsers: (connectedUsers: IConnectedUsers) => void;
    receiveMessage: (message: string) => void;
    signIn: (info: IConnectedUsers) => void;
    connect: () => void;
    unsentMessage: (message: string) => void;
    userIsTyping: ({ isTyping: boolean, names: string }) => void;
  }
}
