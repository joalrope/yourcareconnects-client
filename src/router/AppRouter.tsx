/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((prop: any, key: any) => {
        if (prop.redirect) {
          return;
        } else {
          return (
            <>
              <Route path={prop.path} element={prop.component} key={key} />
            </>
          );
        }
      })}
    </Routes>
  );
};
