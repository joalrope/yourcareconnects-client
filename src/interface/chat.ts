import { MessageDirection } from "@chatscope/chat-ui-kit-react/src/types/unions";

export enum IMessagePosition {
  cero = 0,
  uno = 1,
  dos = 2,
  tres = 3,
  single = "single",
  first = "first",
  normal = "normal",
  last = "last",
}

export enum IMessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  FILE = "file",
}

export interface IChatMessage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  message: string;
  sentTime: string;
  sender: string;
  type: IMessageType;
  direction: MessageDirection;
  position: IMessagePosition;
  senderId: string;
  receiverId: string;
}

export interface IConversation {
  id: string;
  names: string;
  picture: { image: string; name: string; type: string };
  info: string;
  unreadCnt?: number;
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
  unreadCount: number;
  chatMessages: { [x: string]: IChatMessage[] };
  receiverId: string;
  room: string;
  senderId: string;
}
