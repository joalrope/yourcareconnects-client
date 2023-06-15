import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { Route, routes } from "../router/routes";
import { INav } from "./AppLayout";

import { RootState } from "../store";
import { setES, setLoggedIn, setUS } from "../store/slices";
import "./app-layout.css";

export const HeaderContent = () => {
  const { t, i18n } = useTranslation();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const mode = "";

  const handleLogOut = () => {
    dispatch(setLoggedIn(false));
  };

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

  const loggedItems: MenuProps["items"] = [
    {
      label: (
        <Link to="/upload" style={{ userSelect: "none" }}>
          <Avatar shape="circle" src="/images/man.png" />
        </Link>
      ),
      key: "notify",
    },
    {
      label: (
        <Link to="/upload" style={{ userSelect: "none" }}>
          <Badge count={1}>
            <Avatar shape="circle" src="/images/bell-icon.png" />
          </Badge>
        </Link>
      ),
      key: "upload",
    },
    {
      label: (
        <Link to="/" onClick={handleLogOut}>
          Log Out
        </Link>
      ),
      key: "logout",
      icon: <ProfileOutlined />,
    },
  ];

  let locationPath;

  const setLng = () => {
    if (language === "enUS") {
      i18n.changeLanguage("es");
      dispatch(setES());
    }
    if (language === "esES") {
      i18n.changeLanguage("en");
      dispatch(setUS());
    }
  };

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
        <div className="--layout__sider-logo"></div>
        /*  <div className="--layout-header__logo">
          <div className="--app__logo" />
        </div> */
      )}
      {!isLoggedIn && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={locationPath}
          defaultSelectedKeys={["/"]}
          onClick={handleClick}
          items={items}
        />
      )}

      {isLoggedIn && (
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={handleClick}
          items={loggedItems}
        />
      )}

      <Tooltip
        placement="top"
        title={"English/Español"}
        className="--tooltip-title__language"
      >
        <Avatar
          onClick={setLng}
          size={24}
          src={
            language === "enUS" ? "/images/ES-flag.png" : "/images/US-flag.png"
          }
        />
      </Tooltip>
    </>
  );
};
