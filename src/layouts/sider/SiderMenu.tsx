/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import {
  CompassOutlined,
  DashboardOutlined,
  FileSearchOutlined,
  MessageOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLocationPath } from "../../store/slices/router/routerSlice";

export interface INav {
  key: string;
  keyPath: string[];
}

export const SiderMenu = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { locationPath } = useSelector((state: RootState) => state.router);

  const role = "customer";

  const providerRoutes = [
    {
      label: <Link to="/dashboard">{t("Dashboard")}</Link>,
      path: "/dashboard",
      key: "dashboard",
      role: "customer",
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to="/profile">{t("Profile")}</Link>,
      path: "/profile",
      key: "profile",
      role: "customer",
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="/services">{t("Services")}</Link>,
      path: "/services",
      key: "services",
      role: "customer",
      icon: <FileSearchOutlined />,
    },
    {
      label: <Link to="/blog">{t("Blog")}</Link>,
      path: "/blog",
      key: "blog",
      role: "customer",
      icon: <MessageOutlined />,
    },
    {
      label: <Link to="/getLatLng">{t("Map")}</Link>,
      path: "/getLatLng",
      key: "map",
      role: "customer",
      icon: <CompassOutlined />,
    },
  ];

  const items: MenuProps["items"] = providerRoutes.filter(
    (item) => item.role == role
  );

  const handleClick = ({ key }: INav) => {
    dispatch(setLocationPath(key));
    if (key === "logout") {
      // dispatch(startLogout());
      // clearStore(dispatch);
      //history.push("/home");
      // dispatch(setCurrentPath("/home"));
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[locationPath]}
      defaultSelectedKeys={["/"]}
      onClick={handleClick}
      items={items}
    />
  );
};
