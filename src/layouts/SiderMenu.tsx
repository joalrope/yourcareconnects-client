/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import { UploadOutlined, ProfileOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLocationPath } from "../store/slices/router/routerSlice";

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
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="/profile">{t("Profile")}</Link>,
      path: "/profile",
      key: "profile",
      role: "customer",
      icon: <ProfileOutlined />,
    },
    {
      label: <Link to="/upload">{t("Docs upload")}</Link>,
      path: "/upload",
      key: "upload",
      role: "customer",
      icon: <UploadOutlined />,
    },
  ];

  const items: MenuProps["items"] = providerRoutes.filter(
    (item) => item.role == role
  );

  const handleClick = ({ key }: INav) => {
    console.log("locationPath", key);
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
