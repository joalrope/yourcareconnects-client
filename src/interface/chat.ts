export interface IMessage {
  senderId: string;
  receiverId: string;
  type: string;
  content: object;
  sentTime: string;
  readTime: string;
  direction: string;
  position: string;
}

export interface IConversation {
  id: string;
  names: string;
  picture: string;
  info: string;
}

export interface IConnectedUsers {
  [key: string]: {
    names: string;
    socketId: string;
  };
}

export interface IChat {
  connectedUsers: IConnectedUsers;
  conversations: IConversation[];
  messages: IMessage[];
  receiverId: string;
  room: string;
  senderId: string;
}
