import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Menu, Tooltip, Typography, theme } from "antd";
import type { MenuProps } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { Route, routes } from "../router/routes";
import { INav } from "./AppLayout";

import { RootState } from "../store";
import { logout, setES, setUS } from "../store/slices";
import "./app-layout.css";

const { Title } = Typography;
const { useToken } = theme;

export const HeaderContent = () => {
  const { t, i18n } = useTranslation();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { isLoggedIn, names } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { token } = useToken();

  const mode = "";

  const handleLogOut = () => {
    dispatch(logout());
    sessionStorage.clear();
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
        <Title style={{ color: token.colorPrimary }} level={5}>
          {names}
        </Title>
      ),
      key: "names",
    },
    {
      label: <Avatar shape="circle" src="/images/man.png" />,
      key: "avatar",
    },
    {
      label: (
        <Badge count={1}>
          <Avatar shape="circle" src="/images/bell-icon.png" />
        </Badge>
      ),
      key: "notify",
    },
    {
      label: (
        <Link to="/" onClick={handleLogOut}>
          {t("Log Out")}
        </Link>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
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
