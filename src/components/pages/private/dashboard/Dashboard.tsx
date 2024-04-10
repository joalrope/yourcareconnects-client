import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";
import { DashboardDev } from "./DashboardDev";

export const Dashboard = () => {
  const { role } = useSelector((state: RootState) => state.user);

  if (role === "customer" || role === "provider") {
    return <DashboardUser />;
  }

  if (role === "superadmin") {
    return <DashboardAdmin />;
  }

  if (role === "owner") {
    return <DashboardAdmin />;
  }

  if (role === "developer") {
    return <DashboardDev />;
  }
};
