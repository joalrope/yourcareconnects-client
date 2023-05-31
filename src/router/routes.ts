/* eslint-disable @typescript-eslint/no-explicit-any */
// import { AppLayout } from '../layouts/AppLayout';
// import { Home, Sales, Inventory } from '../components/pages';
import {
  // AppstoreAddOutlined,
  // AreaChartOutlined,
  // BarcodeOutlined,
  // DollarOutlined,
  // FileDoneOutlined,
  //  HomeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  // LoginOutlined,
  // PrinterOutlined,
  // TagsOutlined,
  // UserAddOutlined,
  // UsergroupAddOutlined,
} from "@ant-design/icons";
import { /*  Home, */ Login, Register } from "../components/pages";

// export const initRoutes = [
//   { path: '/', name: 'Starter', type: 'public', component: AppLayout },
// ];

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
  icon?: React.ElementType;
  component: () => JSX.Element;
  children?: Children[];
}

export const routes: Route[] = [
  /*  {
    key: "/home",
    Pos: "header",
    path: "/home",
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
    icon: UploadOutlined,
    component: Login,
  },
  {
    key: "register",
    Pos: "header",
    path: "/register",
    type: "public",
    name: "Create account",
    mode: "",
    icon: VideoCameraOutlined,
    component: Register,
  },
  // { path: '/', pathTo: '/home', name: 'Inicio', redirect: true },
];
