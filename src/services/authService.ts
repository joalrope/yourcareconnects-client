import { fetchWithoutToken } from "../helpers/fetch";
import { ILoginData } from "../components/forms/auth/LoginForm";

export const loginUser = async (userData: ILoginData) => {
  const result = await fetchWithoutToken("/auth/login", userData, "POST");

  return result;
};

export const forgotPassword = async (email: string) => {
  //

  const result = await fetchWithoutToken(
    "/auth/forgotPassword",
    { email },
    "POST"
  );

  return result;
};

export const changePassword = async (token: string, password: string) => {
  const result = await fetchWithoutToken(
    "/auth/changePassword",
    { token, password },
    "POST"
  );

  return result;
};
