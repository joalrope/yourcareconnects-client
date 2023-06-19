import { fetchWithoutToken } from "../../../helpers/fetch";
import { AppDispatch } from "../../store";
import { setUser } from "./userSlice";

export const register = (data: object) => {
  return async (dispatch: AppDispatch) => {
    console.log(data);

    const result = await fetchWithoutToken("/users", data, "POST");

    const resp = await result.json();

    console.log(resp);

    //console.log(getState);
    dispatch(setUser(resp));
  };
};

/* export const login = async (data: object) => {
  return async (dispatch: AppDispatch, getState: () => unknown) => {
    const url = `${baseUrl}${""}`;

    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-role": "basic",
      },
      body: JSON.stringify(data),
    });

    console.log(resp);
    // console.log(getState);
    //dispatch(setUser(resp));
  };
}; */
