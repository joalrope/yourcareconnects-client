import { fetchWithToken } from "../helpers/fetch";
import { IItem } from "../components/ui-components/CategorySelect";

export interface Result {
  ok: boolean;
  msg: string;
  result: {
    services: IItem[];
  };
}

export const getServices = async () => {
  const result: Result = await fetchWithToken("/services/");

  return result;
};
export const addNewService = async (title: string, color: string) => {
  const result: Result = await fetchWithToken(
    "/services",
    { title, color },
    "POST"
  );

  return result;
};

export const updateService = async (
  parent: string,
  title: string,
  color: string
) => {
  const result: Result = await fetchWithToken(
    "/services",
    { parent, title, color },
    "PUT"
  );

  return result;
};
