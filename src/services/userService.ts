import { IProvider } from "../components/forms/auth/ProviderForm";
import { fetchWithToken } from "../helpers/fetch";

export const getUserById = async (id: string) => {
  const result = await fetchWithToken(`/users/${id}`);

  return result;
};

export const getUserByServices = async (services: string[]) => {
  if (services.length > 1) {
    const query = services
      .reduce((queryString, service) => {
        return queryString + `&services=${service}`;
      }, "")
      .replace("&", "?");

    return await fetchWithToken(`/users/services${query}`);
  }

  return await fetchWithToken(`/search/users/${services[0]}`);
};

export const updateUserById = async (
  id: string | undefined,
  data: IProvider
) => {
  const result = await fetchWithToken(`/users/${id}`, data, "PUT");

  return result;
};
