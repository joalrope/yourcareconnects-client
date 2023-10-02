import { AppLogo } from "../AppLogo";
import { SiderMenu } from "./SiderMenu";

import "../app-layout.css";

export const SiderContent = ({ collapsed = false }: { collapsed: boolean }) => {
  return (
    <div className="--layout__sider">
      <AppLogo collapsed={collapsed} />
      <SiderMenu />
    </div>
  );
};
