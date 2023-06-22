import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";

import { Route, routes } from "../router/routes";
import { InfoContent } from "./InfoContent";
import { RootState } from "../store";

import "./app-layout.css";
import { INav } from "./SiderMenu";

export const HeaderContent = () => {
  const { t } = useTranslation();
  const { isLoggedIn, names } = useSelector((state: RootState) => state.user);

  const mode = "";

  const items: MenuProps["items"] = routes
    .filter(
      (route: Route) =>
        route.Pos === "header" &&
        (route.type === "public" ||
          (route.type === "auth" && route.mode === mode))
    )
    .map((route: Route) => ({
      label: <Link to={route.path}>{t(`${route.name}`)}</Link>,
      path: route.path,
      key: route.key,
    }));

  let locationPath;

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
    <>
      {!isLoggedIn && (
        <>
          <div className="--layout__sider-logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={locationPath}
            defaultSelectedKeys={["/"]}
            onClick={handleClick}
            items={items}
          />
        </>
      )}

      {isLoggedIn && <InfoContent names={names} />}
    </>
  );
};
