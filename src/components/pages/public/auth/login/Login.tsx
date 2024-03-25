import { useEffect } from "react";
import { Col, Row } from "antd";
import { LoginForm } from "../../../../forms/auth/LoginForm";
import ImageYCC from "../../../../ui-components/ImageYCC";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Row
      gutter={16}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: 24,
      }}
    >
      <Col
        xs={0}
        sm={0}
        md={11}
        lg={11}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ImageYCC width="30vw" />
      </Col>
      <Col
        xs={24}
        offset={1}
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
