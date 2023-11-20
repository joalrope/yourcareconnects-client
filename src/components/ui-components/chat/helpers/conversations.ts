import { getUserById } from "../../../../services";

export const getConversations = async (contacts: string[]) => {
  return await Promise.all(
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
        };
      }

      return {
        id: "",
        names: "",
        picture: "",
        info: "",
      };
    })
  );
};
