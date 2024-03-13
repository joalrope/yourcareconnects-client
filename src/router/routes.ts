import { Login, Register } from "../components/pages";

export interface Children {
  label: React.ReactNode;
  key: React.ReactNode;
}

export interface IRoute {
  key: string;
  path: string;
  Pos: string;
  type: string;
  name: React.ReactNode;
  mode: string;
  element?: () => JSX.Element;
  icon?: string;
  children?: Children[];
}

export const routes: IRoute[] = [
  {
    key: "donations",
    Pos: "header",
    path: "/donations",
    type: "public",
    name: "donations",
    mode: "",
    icon: "UploadOutlined",
  },
  {
    key: "blog",
    Pos: "header",
    path: "/blog",
    type: "public",
    name: "blog",
    mode: "",
    icon: "UploadOutlined",
  },
  {
    key: "shop",
    Pos: "header",
    path: "/shop",
    type: "public",
    name: "shop",
    mode: "",
    icon: "UploadOutlined",
  },
  {
    key: "login",
    Pos: "header",
    path: "/login",
    type: "public",
    name: "Log in",
    mode: "",
    icon: "UploadOutlined",
    element: Login,
  },
  {
    key: "register",
    Pos: "header",
    path: "/home/create-account",
    type: "public",
    name: "Create account",
    mode: "",
    icon: "VideoCameraOutlined",
    element: Register,
  },
  {
    key: "logout",
    Pos: "header",
    path: "/",
    type: "private",
    name: "Log Out",
    mode: "",
    icon: "VideoCameraOutlined",
    element: Register,
  },
];
