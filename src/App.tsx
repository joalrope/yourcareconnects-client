import "antd/dist/reset.css";
import { AppLayout } from "./layouts/AppLayout";
import { ConfigProvider } from "antd";
import "./index.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f8c65b", // color primario
          colorBgBase: "#fff", // body color
          colorTextBase: "#1a1a13",
          colorPrimaryText: "#1a1a13",
        },
      }}
    >
      <AppLayout />
    </ConfigProvider>
  );
}

export default App;
