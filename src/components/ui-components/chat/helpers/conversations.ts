import { IConversation } from "../interfaces/chat";
import { Schema } from "mongoose";
import { getUserById } from "../../../../services";

export const getConversations = async (
  contacts: string[],
  notifications: Schema.Types.Mixed
) => {
  const data = await Promise.all(
    contacts.map(async (contact: string) => {
      const user = await getUserById(contact);

      const {
        ok,
        result: {
          id,
          names,
          info,
          pictures: { profile: picture },
        },
      } = user;

      if (ok) {
        return {
          id,
          names,
          picture,
          info,
        } as IConversation;
      }

      return {
        id: "",
        names: "",
        picture: { image: "", name: "", type: "" },
        info: "",
      } as IConversation;
    })
  );

  if (!notifications) {
    return data;
  }

  data.map((conversation) => {
    // eslint-disable-next-line no-prototype-builtins
    if (notifications.hasOwnProperty(`id${conversation.id}`)) {
      Object.entries(notifications).map((entrie) => {
        if (entrie[0] === `id${conversation.id}`) {
          conversation.unreadCnt = entrie[1];
        }
      });
    } else {
      conversation.unreadCnt = 0;
    }
  });

  return data;
};
