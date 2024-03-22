/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import {
  ChangePasword,
  ChangeProfilePicture,
  ChatView,
  Dashboard,
  DashboardAdmin,
  Home,
  Login,
  GetLocationMap,
  NotAllowed,
  NotFound,
  Profile,
  Register,
  ResetPassword,
  SearchServices,
  SelectCreateAccount,
} from "../components/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleProtectedRoute } from "./RoleProtectedRoute";
import { Redirect } from "../components/pages/public/shared/Redirect";
import { ServiceProvidersMap } from "../components/ui-components/map/ServiceProvidersMap";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route key="login" path="/login" element={<Login />} />
      <Route
        key="register-customer"
        path="/register/customer"
        element={<Register />}
      />
      <Route
        key="register-provider-code"
        path="/register/provider/:code"
        element={<Register />}
      />
      <Route
        key="register-provider"
        path="/register/provider"
        element={<Register />}
      />
      <Route
        key="reset-password"
        path="/auth/reset-password"
        element={<ResetPassword />}
      />
      <Route
        key="change-password"
        path="/auth/change-password/:init/:id/:code"
        element={<ChangePasword />}
      />
      <Route
        key="createAccount"
        path="/home/create-account"
        element={<SelectCreateAccount />}
      />
      <Route
        key="shop"
        path="/shop"
        element={<Redirect url="https://www.yourcareconnects.com/shop" />}
      />
      <Route
        key="blog"
        path="/blog"
        element={<Redirect url="https://www.yourcareconnects.com/blog" />}
      />
      <Route
        key="donations"
        path="/donations"
        element={<Redirect url="https://yourcareconnects.com/donations" />}
      />

      <Route element={<ProtectedRoute />}>
        <Route key="upload" path="/upload" element={<ChangeProfilePicture />} />
        <Route key="profile" path="/profile" element={<Profile />} />
        <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
        <Route key="services" path="/services" element={<SearchServices />} />
        <Route key="chat" path="/chat" element={<ChatView />} />
        <Route key="locmap" path="/locationmap" element={<GetLocationMap />} />
        <Route
          key="servicemap"
          path="/servicesmap"
          element={<ServiceProvidersMap />}
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
