import { SiderMenu } from "./SiderMenu";

import "./app-layout.css";

export const SiderContent = () => {
  return (
    <div className="--layout__sider">
      <div className="--layout__sider-logo"></div>
      <SiderMenu />
    </div>
  );
};
