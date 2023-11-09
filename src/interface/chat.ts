interface IContact {
  id: string;
  name: string;
  nickname: string;
}

interface IMessage {
  sender: string;
  receiver: string;
  type: string;
  payload: object;
  sentTime: Date;
}

export interface IChat {
  socketId: string;
  sender: string;
  receiver: string;
  message: string;
  room: string;
  contacts: IContact[];
  messages: IMessage[];
}
