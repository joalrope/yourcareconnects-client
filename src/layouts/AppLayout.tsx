import { /* ReactNode, */ useState } from "react";
import { FloatButton, Layout, Spin } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { SiderContent } from "./sider/SiderContent";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AppRouter } from "../router/AppRouter";

import "./app-layout.css";

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = (/* { children }: { children: ReactNode } */) => {
  const [collapsed, setCollapsed] = useState(false);

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.ui);

  const hScreen = isLoggedIn ? "83.5vh" : "86.7vh";

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const supportPhone = import.meta.env.VITE_SUPPORT_PHONE;

  return (
    <Layout style={{ height: "100vh" }}>
      {isLoggedIn && (
        <Sider
          breakpoint="xs"
          collapsible
          trigger={null}
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <SiderContent collapsed={collapsed} />
        </Sider>
      )}
      <Layout>
        <Header style={{ paddingLeft: 0, width: "100%" }}>
          <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            height: hScreen,
            maxWidth: "100vw",
            overflowX: "hidden",
          }}
        >
          <Spin
            size="large"
            spinning={loading}
            style={{
              position: "absolute",
              top: screen.width / 3,
              left: screen.width / 2,
              zIndex: 100,
            }}
          />
          <AppRouter />
          <FloatButton
            className="float-button"
            style={{ left: isLoggedIn ? 236 : 36 }}
            type="default"
            icon={<WhatsAppOutlined className="float-button-icon" />}
            onClick={() =>
              window.open(`https://wa.me/${supportPhone}`, "_blank")
            }
          />
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
