import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { DashboardAdmin } from "./DashboardAdmin";
import { DashboardUser } from "./DashboardUser";
import { DashboardDev } from "./DashboardDev";

export const Dashboard = () => {
  const { role } = useSelector((state: RootState) => state.user);

  return (
    <>
      {(role === "customer" || role === "provider") && <DashboardUser />}
      {role === "superadmin" && <DashboardAdmin />}
      {role === "owner" && <DashboardAdmin />}
      {role === "developer" && <DashboardDev />}
    </>
  );
};
