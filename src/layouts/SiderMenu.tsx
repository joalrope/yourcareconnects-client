/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from "antd";
import { UploadOutlined, ProfileOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { INav } from "./AppLayout";

const providerRoutes = [
  {
    label: <Link to="/profile">Profile</Link>,
    path: "/profile",
    key: "profile",
    icon: <ProfileOutlined />,
  },
  {
    label: <Link to="/upload">Docs upload</Link>,
    path: "/upload",
    key: "upload",
    icon: <UploadOutlined />,
  },
];

export const SiderMenu = () => {
  let locationPath;

  const items: MenuProps["items"] = providerRoutes;

  const handleClick = ({ key }: INav) => {
    locationPath = key;

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
      selectedKeys={locationPath}
      defaultSelectedKeys={["/"]}
      onClick={handleClick}
      items={items}
    />
  );
};
