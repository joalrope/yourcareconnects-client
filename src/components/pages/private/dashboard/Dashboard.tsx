import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";

export const Dashboard = () => {
  const { role } = useSelector((state: RootState) => state.user);

  return role === "customer" || role === "provider" ? (
    <DashboardUser />
  ) : role === "admin" ? (
    <DashboardAdmin />
  ) : (
    // TODO: Later change to superadmin
    <DashboardAdmin />
  );
};
