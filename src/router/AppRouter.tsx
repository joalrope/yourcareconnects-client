/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import {
  Blog,
  ChangePasword,
  ChangeProfilePicture,
  ChatYCC,
  Dashboard,
  DashboardAdmin,
  GetLatLng,
  Home,
  Login,
  NotAllowed,
  NotFound,
  Profile,
  Register,
  ResetPassword,
  SearchServices,
  SelectCreateAccount,
  ViewProviders,
} from "../components/pages";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleProtectedRoute } from "./RoleProtectedRoute";

export const AppRouter = () => {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route key="login" path="/login" element={<Login />} />
      <Route key="register" path="/register" element={<Register />} />
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

      <Route element={<ProtectedRoute />}>
        <Route key="upload" path="/upload" element={<ChangeProfilePicture />} />
        <Route key="profile" path="/profile" element={<Profile />} />
        <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
        <Route key="services" path="/services" element={<SearchServices />} />
        <Route key="blog" path="/blog" element={<Blog />} />
        <Route key="chat" path="/chat" element={<ChatYCC />} />
        <Route key="getGeoloc" path="/getLatLng" element={<GetLatLng />} />
        <Route
          key="viewProviders"
          path="/viewProviders"
          element={<ViewProviders />}
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
