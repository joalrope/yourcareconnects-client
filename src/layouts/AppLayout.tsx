import { ReactNode, useState } from "react";
import { Layout } from "antd";
import { FooterContent } from "./FooterContent";
import { HeaderContent } from "./HeaderContent";
import { SiderContent } from "./SiderContent";

import "./app-layout.css";

const { Header, Footer, Sider, Content } = Layout;

export interface INav {
  key: string;
  keyPath: string[];
}

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <SiderContent />
      </Sider>
      <Layout>
        <Header>
          <HeaderContent />
        </Header>
        <Content>{children}</Content>
        <Footer>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};
