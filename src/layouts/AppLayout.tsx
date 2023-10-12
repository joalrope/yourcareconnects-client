import { /* ReactNode, */ useState } from "react";
import { Layout, Spin } from "antd";
import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { SiderContent } from "./sider/SiderContent";

import "./app-layout.css";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AppRouter } from "../router/AppRouter";

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = (/* { children }: { children: ReactNode } */) => {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.ui);

  const hScreen = isLoggedIn ? "83.5vh" : "86.7vh";

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Spin
        size="large"
        spinning={loading}
        style={{
          position: "absolute",
          top: screen.availHeight / 3,
          left: screen.availWidth / 2,
          zIndex: 100,
        }}
      />
      {isLoggedIn && (
        <Sider
          breakpoint="xs"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <SiderContent collapsed={collapsed} />
        </Sider>
      )}
      <Layout>
        <Header style={{ paddingLeft: 0, paddingRight: 12 }}>
          <HeaderContent />
        </Header>
        <Content
          style={{
            height: hScreen,
            maxWidth: "100vw",
            overflowY: "scroll",
            overflowX: "hidden",
            padding: 24,
          }}
        >
          <AppRouter />
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
