import { Col, Row } from "antd";
import { ProviderForm } from "../../../forms/ProviderForm";

export const Profile = () => {
  return (
    <Row justify={"center"} align={"middle"}>
      <Col xs={12}>
        <ProviderForm />;
      </Col>
    </Row>
  );
};
