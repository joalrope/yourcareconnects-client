export interface ISender {
  nickname: string;
  socketId: string;
}

export interface IReceiver {
  id: string;
  info: string;
  names: string;
  nickname: string;
  picture: string;
  socketId: string;
}

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
  socketId: string;
}

export interface IConnectedUsers {
  [key: string]: {
    names: string;
    socketId: string;
  };
}

export interface IChat {
  conversations: IConversation[];
  connectedUsers: IConnectedUsers;
  sender: ISender;
  receiver: IReceiver;
  room: string;
  messages: IMessage[];
}
