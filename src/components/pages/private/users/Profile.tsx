import { Col, Row } from "antd";
import { ProviderForm } from "../../../forms/auth/provicer-form/ProviderForm";
import { UploadDocs } from "../../../ui-components/UploadDocs";

export const Profile = () => {
  return (
    <Row style={{ flexDirection: "column" }}>
      <Col>
        <ProviderForm />
      </Col>
      <Col style={{ textAlign: "center" }}>
        <UploadDocs />
      </Col>
    </Row>
  );
};
