import { fetchWithoutToken } from "../../../helpers/fetch";
import { AppDispatch } from "../../store";
import { setUser } from "./userSlice";

export const register = (data: object) => {
  return async (dispatch: AppDispatch) => {
    console.log(data);

    const result = await fetchWithoutToken("/users", data, "POST");

    const resp = await result.json();

    dispatch(setUser(resp));
  };
};
