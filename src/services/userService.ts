import { fetchWithoutToken } from "../helpers/fetch";

export const getUserById = async (id: string) => {
  const result = await fetchWithoutToken(`/users/${id}`);

  return result;
};
