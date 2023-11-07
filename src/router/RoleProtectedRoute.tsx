import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store";

interface Props {
  children?: JSX.Element;
  redirectTo?: string;
}

export const RoleProtectedRoute = ({ children }: Props) => {
  const { role, isLoggedIn } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (
    isLoggedIn === false &&
    location.pathname === "/admin/dashboard" &&
    role !== "admin"
  ) {
    return <Navigate to={"/notAllowed"} />;
  }

  return children ? children : <Outlet />;
};
