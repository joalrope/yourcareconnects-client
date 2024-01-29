import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import { useTranslation } from "react-i18next";

import { IRoute, routes } from "../router/routes";
import { RootState } from "../store";
import { InfoContent } from "./InfoContent";

import "./app-layout.css";
import { INav } from "./sider/SiderMenu";
import { setLocationPath } from "../store/slices/router/routerSlice";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";
import { AppLogo } from "./AppLogo";

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
    dispatch(setLocationPath(key));
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <AppLogo />
          <Col flex={1}></Col>
          <Col xs={10}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[locationPath]}
              defaultSelectedKeys={["/"]}
              onClick={handleClick}
              items={items}
            />
          </Col>
          <Col xs={0} sm={4}>
            <LanguageSelect />
          </Col>
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
