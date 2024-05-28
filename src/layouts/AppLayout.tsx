import { FloatButton, Layout, Row, Spin } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";

import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { SiderContent } from "./sider/SiderContent";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AppRouter } from "../router/AppRouter";
import { setCollapsed } from "../store/slices/router/routerSlice";

import "./app-layout.css";

const { Header, Footer, Sider, Content } = Layout;

export const AppLayout = (/* { children }: { children: ReactNode } */) => {
  //const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const { collapsed } = useSelector((state: RootState) => state.router);

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.ui);

  const hScreen = isLoggedIn ? "83.5vh" : "86.7vh";

  const onCollapse = () => {
    dispatch(setCollapsed(!collapsed));
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
          <SiderContent />
        </Sider>
      )}
      <Layout>
        <Header style={{ paddingLeft: 0, width: "100%" }}>
          <HeaderContent />
        </Header>
        <Content
          style={{
            height: hScreen,
            maxWidth: "100vw",
            overflowX: "hidden",
          }}
        >
          {(!isLoggedIn ||
            (isLoggedIn && window.innerWidth > 360) ||
            (isLoggedIn && collapsed && window.innerWidth <= 360)) && (
            <Row style={{ width: "100%", height: "100%" }}>
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
                style={{
                  left: isLoggedIn ? (collapsed ? 88 : 208) : 36,
                  backgroundColor: "#01e675",
                  bottom: 88,
                  height: 48,
                  width: 48,
                }}
                type="default"
                icon={<WhatsAppOutlined className="float-button-icon" />}
                onClick={() =>
                  window.open(`https://wa.me/${supportPhone}`, "_blank")
                }
              />
            </Row>
          )}
        </Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
