/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import {
  Blog,
  Dashboard,
  DashboardAdmin,
  Home,
  Login,
  NotAllowed,
  NotFound,
  Profile,
  Register,
  SearchServices,
  SelectCreateAccount,
} from "../components/pages";

const ChangePasword = lazy(
  () => import("../components/pages/public/auth/reset/ChangePaswword")
);
const ResetPassword = lazy(
  () => import("../components/pages/public/auth/reset/ChangePaswword")
);
const SearchServices = lazy(
  () => import("../components/pages/private/services/SearchServices")
);
const Blog = lazy(() => import("../components/pages/private/blog/Blog"));

import { ProtectedRoute } from "./ProtectedRoute";
import { RoleProtectedRoute } from "./RoleProtectedRoute";
import { Suspense, lazy } from "react";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
      <Route
        key="reset-password"
        path="/auth/reset-password"
        element={
          <Suspense fallback={<>...</>}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        key="change-password"
        path="/auth/change-password/:init/:id/:code"
        element={
          <Suspense fallback={<>...</>}>
            <ChangePasword />
          </Suspense>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route
          key="createAccount"
          path="/home/create-account"
          element={<SelectCreateAccount />}
        />

        <Route key="profile" path="/profile" element={<Profile />} />
        <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
        <Route
          key="services"
          path="/services"
          element={
            <Suspense fallback={<>...</>}>
              <SearchServices />
            </Suspense>
          }
        />
        <Route
          key="blog"
          path="/blog"
          element={
            <Suspense fallback={<>...</>}>
              <Blog />
            </Suspense>
          }
        />
      </Route>
      <Route element={<RoleProtectedRoute />}>
        <Route
          key="dashboardAdmin"
          path="/admin/dashboard"
          element={<DashboardAdmin />}
        />
      </Route>
      <Route key="notAllowed" path="/notAllowed" element={<NotAllowed />} />
      <Route key="notFound" path="*" element={<NotFound />} />
    </Routes>
  );
};
