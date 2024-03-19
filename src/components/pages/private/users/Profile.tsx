import { Col, Row } from "antd";
import { ProviderForm } from "../../../forms/auth/provicer-form/ProviderForm";

export const Profile = () => {
  return (
    <Row style={{ flexDirection: "column" }}>
      <Col style={{ position: "relative" }}>
        <ProviderForm />
      </Col>
    </Row>
  );
};
