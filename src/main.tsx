import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

import "./i18n/i18n";
import ChatSocketCtxProvider from "./components/ui-components/chat/context/Provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatSocketCtxProvider>
        <App />
      </ChatSocketCtxProvider>
    </Provider>
  </React.StrictMode>
);
