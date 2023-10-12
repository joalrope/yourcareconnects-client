import { fetchWithToken } from "../helpers/fetch";

export const getProfileImage = async (id: string, image: string) => {
  const {
    ok,
    result: { url },
  } = await fetchWithToken(`/uploads/user/${id}/img/${image}`);

  if (ok) {
    return url as string;
  }

  return null;
};
