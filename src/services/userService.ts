import { fetchWithToken } from "../helpers/fetch";

export const getUserById = async (id: string) => {
  const result = await fetchWithToken(`/users/${id}`);

  return result;
};

export const getUserByServices = async (services: string[]) => {
  console.log(services);
  if (services.length > 1) {
    const query = services
      .reduce((queryString, service) => {
        return queryString + `&services=${service}`;
      }, "")
      .replace("&", "?");

    return await fetchWithToken(`/users/services${query}`);
  }

  console.log(`/search/users/${services[0]}`);
  return await fetchWithToken(`/search/users/${services[0]}`);
};
