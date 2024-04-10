import { fetchWithToken } from "../helpers/fetch";

export const UserHardDeleteService = async () => {
  const { ok, msg, result } = await fetchWithToken("/dev/clearContacts");

  return {
    ok,
    msg,
    result,
  };
};
export const clearContactsService = async () => {
  const { ok, msg, result } = await fetchWithToken("/dev/clearContacts");

  return {
    ok,
    msg,
    result,
  };
};
