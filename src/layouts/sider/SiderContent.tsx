import { AppLogo } from "../AppLogo";
import { SiderMenu } from "./SiderMenu";

import "../app-layout.css";

export const SiderContent = () => {
  return (
    <div className="--layout__sider">
      <AppLogo />
      <SiderMenu />
    </div>
  );
};
