import { fetchWithToken } from "../helpers/fetch";
import { Item } from "../components/ui-components/CategorySelect";

export interface Result {
  ok: boolean;
  msg: string;
  result: {
    services: Item[];
  };
}

export const getServices = async () => {
  const result: Result = await fetchWithToken("/services/");

  return result;
};
