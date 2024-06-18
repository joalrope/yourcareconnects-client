import { Col, Row } from "antd";
import RoleCard from "../../../ui-components/RoleCard";

export const SelectCreateAccount = () => {
  return (
    <Row
      style={{
        height: "100%",
        marginInline: 0,
        maxHeight: "86.5vh",
        maxWidth: "100vw",
        padding: 24,
        width: "100%",
      }}
      align="middle"
      gutter={[50, 50]}
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
