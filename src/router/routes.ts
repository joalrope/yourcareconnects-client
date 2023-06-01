import { Login, Register } from "../components/pages";

export interface Children {
  label: React.ReactNode;
  key: React.ReactNode;
}

export interface Route {
  key: string;
  path: string;
  Pos: string;
  type: string;
  name: React.ReactNode;
  mode: string;
  component: () => JSX.Element;
  icon?: string;
  children?: Children[];
}

export const routes: Route[] = [
  /* {
    key: "home",
    Pos: "header",
    path: "/",
    type: "public",
    name: "Inicio",
    mode: "",
    icon: HomeOutlined,
    component: Home,
  }, */
  {
    key: "login",
    Pos: "header",
    path: "/login",
    type: "public",
    name: "Login",
    mode: "",
    icon: "UploadOutlined",
    component: Login,
  },
  {
    key: "register",
    Pos: "header",
    path: "/register",
    type: "public",
    name: "Create account",
    mode: "",
    icon: "VideoCameraOutlined",
    component: Register,
  },
  {
    key: "register",
    Pos: "sider",
    path: "/profile",
    type: "public",
    name: "Mi Perfil",
    mode: "",
    icon: "VideoCameraOutlined",
    component: Register,
  },
];
