export interface ISender {
  socketId: string;
  nickname: string;
}

export interface IReceiver {
  id: string;
  socketId: string;
  fullname: string;
  nickname: string;
  picture: string;
  info: string;
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
  name: string;
  picture: string;
  info: string;
}

export interface IChat {
  sender: ISender;
  receiver: IReceiver;
  room: string;
  conversations: IConversation[];
  messages: IMessage[];
}
