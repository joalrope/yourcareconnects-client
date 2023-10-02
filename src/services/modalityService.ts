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
  const result: Result = await fetchWithToken("/modalities/");

  return result;
};
export const addNewModality = async (title: string, color: string) => {
  const result: Result = await fetchWithToken(
    "/modalities",
    { title, color },
    "POST"
  );

  return result;
};

export const updateModality = async (title: string, color: string) => {
  const result: Result = await fetchWithToken(
    "/modalities",
    { title, color },
    "PUT"
  );

  return result;
};

export const deleteModality = async (id: string) => {
  const result: Result = await fetchWithToken("/modalities", { id }, "DELETE");

  return result;
};
