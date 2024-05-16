import { fetchWithToken } from "../helpers/fetch";

export const userHardDeleteService = async (email: string) => {
  const { ok, msg, result } = await fetchWithToken(
    `/dev/userHardDelete/${email}`
  );

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

export const ratingsNormalizeService = async () => {
  const { ok, msg, result } = await fetchWithToken("/dev/ratingsNormalize");

  return {
    ok,
    msg,
    result,
  };
};
