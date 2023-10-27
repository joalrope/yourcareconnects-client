import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

interface Props {
  children?: JSX.Element;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (isLoggedIn === false) {
    return <Navigate to={"/notAllowed"} />;
  }

  return children ? children : <Outlet />;
};
