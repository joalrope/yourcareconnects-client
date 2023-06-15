import { setUser } from "..";
import { AppDispatch } from "../../store";

const baseUrl = import.meta.env.VITE_URL_BASE;
export const register = (method: string, endpoint: string, data: object) => {
  return async (dispatch: AppDispatch, getState: () => unknown) => {
    const url = `${baseUrl}${endpoint}`;

    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-role": "basic",
      },
      body: JSON.stringify(data),
    });

    console.log(getState);
    dispatch(setUser(resp));
  };
};

export const login = (method: string, endpoint: string, data: object) => {
  return async (dispatch: AppDispatch, getState: () => unknown) => {
    const url = `${baseUrl}${endpoint}`;

    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-role": "basic",
      },
      body: JSON.stringify(data),
    });

    console.log(getState);
    dispatch(setUser(resp));
  };
};
