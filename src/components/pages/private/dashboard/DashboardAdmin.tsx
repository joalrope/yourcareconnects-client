import { Row } from "antd";
import { UserGrid } from "./UserGrid";

export const DashboardAdmin = () => {
  return (
    <Row
      style={{
        justifyContent: "center",
        padding: 12,
        width: "100%",
      }}
    >
      <UserGrid />
    </Row>
  );
};
