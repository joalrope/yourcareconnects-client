import { ReactNode, useState } from "react";
import { Layout } from "antd";
import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { SiderContent } from "./SiderContent";

import "./app-layout.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { Header, Footer, Sider, Content } = Layout;

export interface INav {
  key: string;
  keyPath: string[];
}

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const hScreen = isLoggedIn ? "83.5vh" : "86.8vh";

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      {isLoggedIn && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <SiderContent />
        </Sider>
      )}
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Content
          style={{
            height: hScreen,
            maxWidth: "100vw",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {children}
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
