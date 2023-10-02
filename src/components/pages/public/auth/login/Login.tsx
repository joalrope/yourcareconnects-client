import { Col, Row } from "antd";
import { LoginForm } from "../../../../forms/auth/LoginForm";
import "./login.css";
import ImageYCC from "../../../../ui-components/ImageYCC";

export const Login = () => {
  return (
    <Row
      gutter={16}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Col
        xs={0}
        sm={0}
        md={12}
        lg={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ImageYCC width="30vw" />
      </Col>
      <Col
        xs={24}
        sm={12}
        md={12}
        lg={12}
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <LoginForm />
      </Col>
    </Row>
  );
};
