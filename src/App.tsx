import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { router } from "./router/router";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const { language } = useSelector((state: RootState) => state.i18n);

  const curLng = language === "esES" ? esES : enUS;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FBD467", // color primario
          colorBgBase: "#ffffff29", // body color
          colorTextBase: "#1a1a13",
          colorWhite: "#1a1a13",
        },
      }}
      locale={curLng}
    >
      <AntdApp>
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
