import { Col, Row } from "antd";
import { RegisterForm } from "../../../../forms/auth/RegisterForm";
import "./register.css";

export const Register = () => {
  return (
    <Row>
      <Col style={{ margin: "auto", padding: 24, maxWidth: 500 }}>
        <RegisterForm />
      </Col>
    </Row>
  );
};
