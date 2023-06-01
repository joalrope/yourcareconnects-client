import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { router } from "./router/router";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { useAppSelector } from "./store/hooks";
import { selecti18n } from "./store/reducers/i18n";

function App() {
  const i18n = useAppSelector(selecti18n);

  console.log(i18n);

  const curLng = i18n === "esES" ? esES : enUS;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f8c65b", // color primario
          colorBgBase: "#ffffff29", // body color
          colorTextBase: "#1a1a13",
          colorWhite: "#1a1a13",
        },
      }}
      locale={curLng}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
