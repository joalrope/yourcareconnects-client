import { fetchWithoutToken } from "../helpers/fetch";

export const getCodeInfo = async (code: string | undefined) => {
  if (!code) {
    return {
      ok: false,
      msg: "Please indicate a code",
      result: {},
    };
  }

  const resp = await fetchWithoutToken(`/codes/${code}`);

  return resp;
};

export const setInactivateCode = async (code: string | undefined) => {
  if (!code) {
    return {
      ok: false,
      msg: "Please incate a code",
      result: {},
    };
  }
  const resp = await fetchWithoutToken(`/codes/${code}`, {}, "PUT");

  return resp;
};
