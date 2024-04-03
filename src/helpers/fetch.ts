import { Modal } from "antd";
//import { store } from "../store/store";
//import { startLogout } from '../actions/auth';
//import history from './history/history';
import { parseJwt } from "./parse-jwt";

const baseUrl = import.meta.env.VITE_URL_BASE;
let response;

interface IMethod {
  [key: string]: string;
}

const methods: IMethod = {
  POST: "create",
  PUT: "update",
  PATCH: "update",
  DELETE: "delete",
};

export const fetchWithoutToken = (
  endpoint: string,
  data?: unknown,
  method = "GET"
) => {
  const url = `${baseUrl}/api${endpoint}`;

  if (method === "GET") {
    response = fetch(url)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return {
            ok: false,
            msg: `Failed to ${methods[method]} resource, resp.ok = false`,
          };
        }
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return catchError(e);
      });
  } else {
    response = fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-role": "basic",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return {
            ok: resp.ok,
            msg: resp.statusText,
            statuscode: resp.status,
          };
        }
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        return catchError(e);
      });
  }

  return response;
};

export const fetchWithToken = (
  endpoint: string,
  data?: object,
  method = "GET",
  header?: object
) => {
  const url = `${baseUrl}/api${endpoint}`;
  const role = parseJwt();
  const token = sessionStorage.token;

  const getHeaders = { "x-token": token, "x-role": role, ...header };

  const postHeaders = {
    "content-type": "application/json",
    "x-token": token,
    ...header,
  };

  if (method === "GET") {
    response = fetch(url, {
      method,
      headers: getHeaders,
      //signal: setTimeout(50).signal,
    })
      .then((resp) => {
        checkSessionStatus(resp.status);
        if (resp.ok) {
          return resp.json();
        } else {
          return {
            ok: false,
            msg: `Failed to ${methods[method]} resource`,
            result: {},
          };
        }
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return catchError(e);
      });
  } else {
    response = fetch(url, {
      method,
      headers: postHeaders,
      //signal: setTimeout(50).signal,
      body: JSON.stringify(data),
    })
      .then((resp) => {
        checkSessionStatus(resp.status);
        if (resp.ok) {
          return resp.json();
        } else {
          return {
            ok: false,
            msg: `Failed to ${methods[method]} resource`,
            result: {},
          };
        }
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return catchError(e);
      });
  }

  return response;
};

/* const setTimeout = (time) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
}; */

const catchError = (error: Error) => {
  return {
    ok: false,
    msg: "The request was rejected. It seems that there is no Internet connection",
    result: error,
  };
};

const checkSessionStatus = (status: number) => {
  if (status === 401) {
    const previousUrl = window.location.pathname;
    sessionStorage.clear();
    //store.dispatch(startLogout());
    showExpiredSessionMessage(previousUrl);

    return {
      ok: false,
      msg: "unauthorized",
      result: {},
    };
  }
  if (status === 404) {
    return {
      ok: false,
      msg: "Resource not found ",
      result: {},
    };
  }
};

const showExpiredSessionMessage = (url: string) => {
  Modal.info({
    title: "User session",
    content: ["Your active session has expired. Please start a new one"],
    okText: "Agreed",
    okType: "primary",
    //confirmLoading: true,
    autoFocusButton: null,
    onOk() {
      //history.replace(url);
      //history.push("/home");
      //history.push("/login");
      console.log("Ok Modal Info", url);
    },
  });
};

/* return fetch(
  `${endpoint}/users?${serializeQuery({
    per_page: meta.pageSize,
    page: meta.page - 1,
  })}`
) */

/* export function serializeQuery(query) {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
} */
