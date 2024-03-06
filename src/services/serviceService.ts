import { fetchWithToken } from "../helpers/fetch";
import { IItem } from "../components/ui-components/category-select/interfaces";

export interface Result {
  ok: boolean;
  msg: string;
  result: {
    services: IItem[];
  };
}

export const getServices = async () => {
  const resp: Result = await fetchWithToken("/services/");

  return resp;
};
export const addNewService = async (title: string, color: string) => {
  const resp: Result = await fetchWithToken(
    "/services",
    { title, color },
    "POST"
  );

  return resp;
};

export const updateService = async (
  parent: string,
  title: string,
  color: string
) => {
  const resp: Result = await fetchWithToken(
    "/services",
    { parent, title, color },
    "PUT"
  );

  return resp;
};

export interface IRes {
  service: string;
  color: string;
}
export const getServicesWithColor = async (services: string[] | undefined) => {
  if (!services) return;

  const { resp } = await fetchWithToken(
    `/services/get-colors`,
    { services },
    "POST"
  );

  return resp;
};

export const setServicesWithColor = async () => {
  const { resp } = await fetchWithToken(`/services/set-colors`);

  return resp;
};
