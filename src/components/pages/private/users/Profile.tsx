import { Row } from "antd";
import { ProviderForm } from "../../../forms/auth/provicer-form/ProviderForm";

export const Profile = () => {
  return (
    <Row justify={"center"} align={"middle"} style={{ padding: 24 }}>
      <ProviderForm />;
    </Row>
  );
};
