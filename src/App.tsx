import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { RootState } from "./store";
import { setUser } from "./store/slices";
import { router } from "./router/router";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { getUserById } from "./services/userService";

function App() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.i18n);

  const curLng = language === "esES" ? esES : enUS;

  console.log("=======Reinicio========");

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

    const { ok, result } = await getUserById(id);
    console.log({ ok, result });

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
          colorPrimary: "#fbd467", // color primario
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
