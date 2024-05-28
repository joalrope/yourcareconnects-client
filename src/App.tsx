import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { App as AntdApp, ConfigProvider } from "antd";
import { setES, setLoading, setLoggedIn, setUser } from "./store/slices";
import enUS from "antd/locale/en_US";
import esES from "antd/locale/es_ES";
import "antd/dist/reset.css";
import "./index.css";
import { AppLayout } from "./layouts/AppLayout";
import { BrowserRouter } from "react-router-dom";
import { getUserById } from "./services";
import i18n from "./i18n/i18n";

function App() {
  const dispatch = useDispatch();
  const [curLng, setCurLng] = useState(enUS);

  useEffect(() => {
    const lang = window.navigator.language.split("-")[0];

    if (lang === "es") {
      i18n.changeLanguage("es");
      dispatch(setES());
    }

    setCurLng(lang === "es" ? esES : enUS);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            colorItemBgHover: "#000000",
            colorItemBgSelected: "#000000",
            colorItemTextSelected: "#1a1a13",
            paddingContentVertical: 0,
          },
          Select: {
            colorBgBase: "red",
          },
          Input: {
            colorBorder: "#444444",
          },
        },
        token: {
          colorPrimary: "#fbd467", // color primario
          colorBgBase: "#ffffff29", // body color
          colorTextBase: "#1a1a13",
          colorText: "#1a1a13",
          //colorWhite: "#1a1a13",
          colorWhite: "#fafafa",
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
