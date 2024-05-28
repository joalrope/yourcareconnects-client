import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import {
  MenuOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { IRoute, routes } from "../router/routes";
import { RootState } from "../store";
import { InfoContent } from "./InfoContent";

import "./app-layout.css";
import { INav } from "./sider/SiderMenu";
import {
  setCollapsed,
  setLocationPath,
} from "../store/slices/router/routerSlice";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";
import { AppLogo } from "./AppLogo";
import { setIsOpened } from "../store/slices";

export const HeaderContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoggedIn, names } = useSelector((state: RootState) => state.user);
  const { collapsed, locationPath } = useSelector(
    (state: RootState) => state.router
  );
  const { isOpened } = useSelector((state: RootState) => state.ui);

  const mode = "";

  const items: MenuProps["items"] = routes
    .filter(
      (route: IRoute) =>
        route.Pos === "header" &&
        (route.type === "public" ||
          (route.type === "auth" && route.mode === mode))
    )
    .map((route: IRoute) => ({
      label: (
        <Link to={route.path} onClick={() => handleNameClick()}>
          {t(`${route.name}`)}
        </Link>
      ),
      path: route.path,
      key: route.key,
    }));

  const items2: MenuProps["items"] = [
    ...items,
    {
      label: <LanguageSelect />,
      key: "lng",
    },
  ];

  const handleClick = ({ key }: INav) => {
    dispatch(setLocationPath(key));
  };

  const handleOpenChange = (flag: boolean) => {
    dispatch(setIsOpened(flag));
  };

  const handleNameClick = () => {
    dispatch(setIsOpened(false));
    dispatch(setLocationPath("dashboard"));
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <AppLogo />
          <Col flex={1}></Col>
          <Col xs={0} sm={10}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[locationPath]}
              defaultSelectedKeys={["/"]}
              onClick={handleClick}
              items={items}
            />
          </Col>
          <Col xs={14} sm={0}>
            <Row style={{ justifyContent: "end" }}>
              <Dropdown
                menu={{ items: items2 }}
                onOpenChange={handleOpenChange}
                open={isOpened}
              >
                <MenuOutlined style={{ color: "white", fontSize: "32px" }} />
              </Dropdown>
            </Row>
          </Col>
          <Col xs={0} sm={4}>
            <LanguageSelect />
          </Col>
        </>
      ) : (
        isLoggedIn && (
          <Row
            align={"middle"}
            justify={"space-between"}
            style={{ width: "100%" }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => dispatch(setCollapsed(!collapsed))}
              style={{
                color: "#fbd467",
                fontSize: 16,
                width: 24,
                height: 48,
              }}
            />

            <InfoContent names={names} />
          </Row>
        )
      )}
    </>
  );
};
