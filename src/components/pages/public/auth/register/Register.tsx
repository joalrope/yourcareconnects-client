import { Col, Row } from "antd";
import { RegisterForm } from "../../../../forms/auth/RegisterForm";
import "./register.css";
import { useLocation } from "react-router-dom";

export const Register = () => {
  const role = useLocation().pathname.split("/")[2];

  return (
    <Row>
      <Col style={{ margin: "auto", padding: 24, maxWidth: 500 }}>
        <RegisterForm role={role} />
      </Col>
    </Row>
  );
};
