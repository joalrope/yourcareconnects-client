import { fetchWithToken } from "../helpers/fetch";

export interface IModality {
  title: string;
  tagColor?: string;
}

export interface Result {
  ok: boolean;
  msg: string;
  result: {
    modalities: IModality[];
  };
}

export const getModalities = async () => {
  const resp: Result = await fetchWithToken("/modalities/");

  return resp;
};
export const addNewModality = async (title: string, color: string) => {
  const resp: Result = await fetchWithToken(
    "/modalities",
    { title, color },
    "POST"
  );

  return resp;
};

export const updateModality = async (title: string, color: string) => {
  const resp: Result = await fetchWithToken(
    "/modalities",
    { title, color },
    "PUT"
  );

  return resp;
};

export const deleteModality = async (id: string) => {
  const resp: Result = await fetchWithToken("/modalities", { id }, "DELETE");

  return resp;
};
