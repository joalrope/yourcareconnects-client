import { fetchWithToken } from "../helpers/fetch";

export const userHardDeleteService = async (email: string) => {
  const { ok, msg, result } = await fetchWithToken(
    `/dev/userHardDelete/${email}`
  );

  console.log({ ok, msg, result });

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
