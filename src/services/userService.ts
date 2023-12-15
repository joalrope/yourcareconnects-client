import { IProvider } from "../components/forms/auth/provicer-form/interfaces";
import { fetchWithToken } from "../helpers/fetch";
import { ILocation } from "../components/ui-components/map/MapView";
import { getLocation } from "../components/ui-components/map/utils/getLocation";

export const getThereIsSuperadmin = async () => {
  const { result } = await fetchWithToken(`/users/sarole`);

  return result;
};

export const getUserById = async (id: string) => {
  const result = await fetchWithToken(`/users/${id}`);

  return result;
};

export const getUsersByIsActive = async (userType: string) => {
  const result = await fetchWithToken(
    `/users/isActive/${userType}?from=0&limit=0`
  );

  return result;
};

export const getUserByServices = async (
  services: string[],
  coordinates: ILocation
) => {
  if (services.length > 1) {
    const query = services.reduce((queryString, service) => {
      return queryString + `services=${service}&`;
    }, "");

    const location = getLocation(coordinates);

    return await fetchWithToken(
      `/users/services/${300}/${location.lat}/${location.lng}?${query}`
    );
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

export const updateUserContactsById = async (
  id: string | undefined,
  contact: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;

  const result1 = await fetchWithToken(
    `/users/contacts/${id}`,
    { contact },
    "PUT"
  );

  if (result1.ok) {
    console.log("result1 ok");
    const result2 = await fetchWithToken(
      `/users/contacts/${contact}`,
      { contact: id },
      "PUT"
    );

    if (result2.ok) {
      console.log("result2 ok");
      result = {
        ok: true,
        msg: "Contacts was updated",
        result: { user: result1.result.user },
      };
    }
  } else {
    result = {
      ok: false,
      msg: "Contacts not updated",
      result: {},
    };
  }

  return result;
};
export const updateActiveUserStatus = async (
  id: string | undefined,
  value: boolean
) => {
  const result = await fetchWithToken(
    `/users/active/${id}/${value}`,
    {},
    "PUT"
  );

  return result;
};
export const updateRoleUser = async (id: string | undefined, value: string) => {
  const result = await fetchWithToken(`/users/role/${id}/${value}`, {}, "PUT");

  return result;
};

export const clearNotificationsById = async (
  receiverId: string,
  senderId: string
) => {
  const result = await fetchWithToken(
    `/users/notifications/${receiverId}/clear/${senderId}`,
    {},
    "PUT"
  );

  return result;
};

export const getUserMessagesById = async (
  senderId: string,
  receiverId: string
) => {
  const result = await fetchWithToken(
    `/users/messages/${senderId}/${receiverId}`
  );

  return result;
};
