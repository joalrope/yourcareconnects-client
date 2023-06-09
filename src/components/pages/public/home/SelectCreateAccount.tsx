import { Col, Row } from "antd";
import RoleCard from "../../../ui-components/RoleCard";

const SelectCreateAccount = () => {
  return (
    <Row
      style={{ height: "100%", maxHeight: "86.5vh", maxWidth: "100vw" }}
      align="middle"
      gutter={50}
      justify="center"
    >
      <Col>
        <RoleCard role="customer" />
      </Col>
      <Col>
        <RoleCard role="provider" />
      </Col>
    </Row>
  );
};

export default SelectCreateAccount;
