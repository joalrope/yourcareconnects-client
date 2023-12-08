import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { RouterProvider } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { RootState } from "./store";
import { setLoading, setLoggedIn, setUser } from "./store/slices";
//import { router } from "./router/router";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { AppLayout } from "./layouts/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { getUserById } from "./services";

function App() {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.i18n);
  const [curLng, setCurLng] = useState(enUS);

  useEffect(() => {
    setCurLng(language === "esES" ? esES : enUS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    dispatch(setLoading(true));
    const { ok, result } = await getUserById(id);
    dispatch(setLoading(false));

    if (ok) {
      result.token = token;
      dispatch(setUser(result));
      dispatch(setLoggedIn(true));
      return;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorItemTextHover: "#1a1a13",
            colorItemText: "#1a1a13",
            colorItemBgHover: "#fbd467",
            colorItemBgSelected: "#fbd467",
            colorItemTextSelected: "#1a1a13",
            paddingContentVertical: 0,
          },
        },
        token: {
          colorPrimary: "#fbd467", // color primario
          colorBgBase: "#ffffff29", // body color
          colorTextBase: "#1a1a13",
          colorText: "#1a1a13",
          colorWhite: "#1a1a13",
        },
      }}
      locale={curLng}
    >
      <AntdApp>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
