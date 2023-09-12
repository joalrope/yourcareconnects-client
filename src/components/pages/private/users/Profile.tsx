import { Col, Row } from "antd";
import { ProviderForm } from "../../../forms/auth/ProviderForm";

export const Profile = () => {
  return (
    <Row justify={"center"} align={"middle"}>
      <Col xs={24} sm={24} md={16} lg={12}>
        <ProviderForm />;
      </Col>
    </Row>
  );
};
