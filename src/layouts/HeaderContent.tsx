/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { Route, routes } from "../router/routes";

interface INav {
  key: string;
  keyPath: string[];
}

export const HeaderContent = () => {
  const isLoggedIn = false;

  const mode = "";

  const items: MenuProps["items"] = routes
    .filter(
      (route: Route) =>
        route.Pos === "header" &&
        (route.type === "public" ||
          (route.type === "auth" && route.mode === mode))
    )
    .map((route: Route) => ({
      label: route.name,
      path: route.path,
      key: route.key,
      // icon: route.icon,
    }));

  let locationPath;

  const handleClick = ({ key, keyPath }: INav) => {
    //const [path]: any = keyPath;
    locationPath = keyPath;

    // dispatch(setCurrentPath(path));
    if (key === "/logout") {
      // dispatch(startLogout());
      // clearStore(dispatch);
      //history.push("/home");
      // dispatch(setCurrentPath("/home"));
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <div className="--layout-header__logo">
          <div className="--app__logo" />
        </div>
      )}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={locationPath}
        defaultSelectedKeys={["register"]}
        onClick={handleClick}
        items={items}
      />
    </>
  );
};
