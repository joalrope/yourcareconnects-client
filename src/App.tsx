import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { router } from "./router/router";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";
import { fetchWithoutToken } from "./helpers/fetch";
import { setUser } from "./store/slices";

function App() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.i18n);

  const curLng = language === "esES" ? esES : enUS;

  useEffect(() => {
    if (sessionStorage.getItem("id")) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    const ssId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    const id = ssId ? JSON.parse(ssId) : "";

    const { ok, result } = await fetchWithoutToken(`/users/${id}`, {}, "GET");

    if (ok) {
      result.token = token;
      dispatch(setUser(result));
      return;
    }
  };

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
