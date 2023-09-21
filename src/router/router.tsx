import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import {
  ChangePasword,
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  UploadDocs,
} from "../components/pages";
import SelectCreateAccount from "../components/pages/public/home/SelectCreateAccount";
import Dashboard from "../components/pages/private/dashboard/Dashboard";
import { Provider } from "../components/pages/public/auth/register/Provider";
import { SearchServices } from "../components/pages/private/services/SearchServices";
//import { ComponentTest } from "../components/ComponentTest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/home/create-account",
    element: (
      <AppLayout>
        <SelectCreateAccount />
      </AppLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <AppLayout>
        <Login />
      </AppLayout>
    ),
  },
  {
    path: "/auth/reset-password",
    element: (
      <AppLayout>
        <ResetPassword />
      </AppLayout>
    ),
  },
  {
    path: "/auth/change-password/:init/:id/:code",
    element: (
      <AppLayout>
        <ChangePasword />
      </AppLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AppLayout>
        <Register />
      </AppLayout>
    ),
  },
  {
    path: "/register/provider",
    element: (
      <AppLayout>
        <Provider />
      </AppLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <AppLayout>
        <Profile />
      </AppLayout>
    ),
  },
  {
    path: "/upload",
    element: (
      <AppLayout>
        <UploadDocs />
        {/* <ComponentTest /> */}
      </AppLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: "/services",
    element: (
      <AppLayout>
        <SearchServices />
      </AppLayout>
    ),
  },
]);
