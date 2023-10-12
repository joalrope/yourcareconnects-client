import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

interface Props {
  children?: JSX.Element;
  redirectTo?: string;
}

export const RoleProtectedRoute = ({ children }: Props) => {
  const { role } = useSelector((state: RootState) => state.user);

  if (role !== "admin") {
    return <Navigate to={"/notAllowed"} />;
  }

  return children ? children : <Outlet />;
};
