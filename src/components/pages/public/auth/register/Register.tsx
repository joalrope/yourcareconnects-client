import { Col, Row } from "antd";
import { RegisterForm } from "../../../../forms/auth/RegisterForm";
import "./register.css";
import { useLocation, useParams } from "react-router-dom";

export const Register = () => {
  const role = useLocation().pathname.split("/")[2];
  const { code } = useParams();

  return (
    <Row style={{ justifyContent: "center", height: "100%", width: "100%" }}>
      <Col style={{ margin: "auto", padding: 24, maxWidth: 500 }}>
        <RegisterForm role={role} code={code} />
      </Col>
    </Row>
  );
};
