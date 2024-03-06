import { fetchWithoutToken } from "../helpers/fetch";
import { ILoginData } from "../components/forms/auth/LoginForm";

export const loginUser = async (userData: ILoginData) => {
  const resp = await fetchWithoutToken("/auth/login", userData, "POST");

  return resp;
};

export const forgotPassword = async (email: string) => {
  //

  const resp = await fetchWithoutToken(
    "/auth/forgotPassword",
    { email },
    "POST"
  );

  return resp;
};

export const changePassword = async (token: string, password: string) => {
  const resp = await fetchWithoutToken(
    "/auth/changePassword",
    { token, password },
    "POST"
  );

  return resp;
};
