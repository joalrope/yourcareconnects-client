import { IProvider } from "../components/forms/auth/provicer-form/interfaces";
import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch";
import { ILocation } from "../components/ui-components/map/GetLocationMap";
import { getCenter } from "../components/ui-components/map/utils/getLocation";
import { IRegister } from "../components/forms/auth/RegisterForm";

export const createUser = async (newUser: IRegister) => {
  const resp = await fetchWithoutToken("/users", newUser, "POST");

  return resp;
};
export const getUserById = async (id: string) => {
  const resp = await fetchWithToken(`/users/${id}`);

  return resp;
};

export const getUserByEmail = async (email: string) => {
  const resp = await fetchWithToken(`/users/email/${email}`);

  return resp;
};

export const getUsersByIsActive = async (userType: string) => {
  const resp = await fetchWithToken(
    `/users/isActive/${userType}?from=${0}&limit=${0}`
  );

  return resp;
};

export const getThereIsSupport = async () => {
  const { resp } = await fetchWithToken(`/users/support`);

  return resp;
};

export const getUserByServices = async (
  services: string[],
  coordinates: ILocation
) => {
  if (services.length > 1) {
    const query = services.reduce((queryString, service) => {
      return queryString + `services=${service}&`;
    }, "");

    const location = getCenter(coordinates);

    const result = await fetchWithToken(
      `/users/services/${300}/${location.lat}/${location.lng}?${query}`
    );

    return result;
  }

  return await fetchWithToken(`/search/users/${services[0]}`);
};

export const updateUserById = async (
  id: string | undefined,
  data: IProvider
) => {
  const resp = await fetchWithToken(`/users/${id}`, data, "PUT");

  return resp;
};

export const updateUserContactsById = async (
  id: string | undefined,
  contact: string,
  addContact: boolean
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let resp: any;
  const mode: string = addContact ? "add" : "remove";

  const resp1 = await fetchWithToken(
    `/users/contacts/${id}?${mode}`,
    { contact },
    "PUT"
  );

  if (resp1.ok) {
    const resp2 = await fetchWithToken(
      `/users/contacts/${contact}?${mode}`,
      { contact: id },
      "PUT"
    );

    if (resp2.ok) {
      resp = {
        ok: true,
        msg: "Contacts was updated",
        result: { user: resp1.result.user },
      };
    }
  } else {
    resp = {
      ok: false,
      msg: "Contacts not updated",
      result: {},
    };
  }

  return resp;
};
export const updateActiveUserStatus = async (
  id: string | undefined,
  value: boolean
) => {
  const resp = await fetchWithToken(`/users/active/${id}/${value}`, {}, "PUT");

  return resp;
};

export const deleteUserById = async (id: string) => {
  const resp = await fetchWithToken(`/users/${id}`, {}, "DELETE");

  return resp;
};

export const restoreUserById = async (id: string) => {
  const resp = await fetchWithToken(`/users/restore/${id}`, {}, "PUT");

  return resp;
};

export const updateUserRatings = async (
  id: string | undefined,
  ratings: number
) => {
  const resp = await fetchWithToken(`/users/ratings/${id}`, { ratings }, "PUT");

  return resp;
};

export const updateRoleUser = async (id: string | undefined, value: string) => {
  const resp = await fetchWithToken(`/users/role/${id}/${value}`, {}, "PUT");

  return resp;
};

export const setUserLocation = async (
  id: string | undefined,
  location: ILocation
) => {
  const resp = await fetchWithToken(
    `/users/location/${id}`,
    { location },
    "PUT"
  );

  return resp;
};

export const clearNotificationsById = async (
  receiverId: string,
  senderId: string
) => {
  const resp = await fetchWithToken(
    `/users/notifications/${receiverId}/clear/${senderId}`,
    {},
    "PUT"
  );

  return resp;
};

export const getUserMessagesById = async (
  senderId: string,
  receiverId: string
) => {
  const resp = await fetchWithToken(
    `/users/messages/${senderId}/${receiverId}`
  );

  return resp;
};
