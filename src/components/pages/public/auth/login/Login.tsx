import { Col, Row } from "antd";
import { LoginForm } from "../../../../forms/LoginForm";
import "./login.css";
import ImageYCC from "../../../../ui-components/ImageYCC";

export const Login = () => {
  return (
    <Row className="--login__container" gutter={16}>
      <Col
        xs={0}
        sm={0}
        md={10}
        lg={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ImageYCC width="75%" />
      </Col>
      <Col className="--login__form" xs={24} sm={24} md={14} lg={12}>
        <LoginForm />
      </Col>
    </Row>
  );
};
