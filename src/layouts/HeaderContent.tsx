import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Row } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";

import { IRoute, routes } from "../router/routes";
import { InfoContent } from "./InfoContent";
import { RootState } from "../store";

import "./app-layout.css";
import { INav } from "./SiderMenu";
import { setLocationPath } from "../store/slices/router/routerSlice";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";

export const HeaderContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn, names } = useSelector((state: RootState) => state.user);
  const { locationPath } = useSelector((state: RootState) => state.router);

  const mode = "";

  const items: MenuProps["items"] = routes
    .filter(
      (route: IRoute) =>
        route.Pos === "header" &&
        (route.type === "public" ||
          (route.type === "auth" && route.mode === mode))
    )
    .map((route: IRoute) => ({
      label: <Link to={route.path}>{t(`${route.name}`)}</Link>,
      path: route.path,
      key: route.key,
    }));

  const handleClick = ({ key }: INav) => {
    console.log(key);
    dispatch(setLocationPath(key));

    if (key === "logout") {
      // dispatch(startLogout());
      // clearStore(dispatch);
      //history.push("/home");
      // dispatch(setCurrentPath("/home"));
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div className="--layout__sider-logo"></div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[locationPath]}
            defaultSelectedKeys={["/"]}
            onClick={handleClick}
            items={items}
          />
          <LanguageSelect />
        </>
      ) : (
        isLoggedIn && (
          <Row justify={"end"} style={{ width: "100%" }}>
            <InfoContent names={names} />
          </Row>
        )
      )}
    </>
  );
};
