import { useDispatch } from "react-redux";

import {
  App,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
  theme,
} from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
//import { fetchWithoutToken } from "../../helpers/fetch";
import { setLoading, setLoggedIn, setUser } from "../../../store/slices";
import { setLocationPath } from "../../../store/slices/router/routerSlice";
import { loginUser } from "../../../services";
import { ReCaptcha } from "../../ui-components/ReCaptcha";
import { useState } from "react";

const { Paragraph, Title } = Typography;
const { useToken } = theme;

export interface ILoginData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { token } = useToken();
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [form] = Form.useForm<ILoginData>();
  const [recaptcha, setRecaptcha] = useState<boolean>(false);

  const onFinish = async ({ email, password }: ILoginData) => {
    const userData: ILoginData = {
      email,
      password,
    };

    dispatch(setLoading(true));

    const {
      ok,
      msg,
      result: { user, token },
    } = await loginUser(userData);

    dispatch(setLoading(false));

    if (!ok) {
      const displayMsg = msg.split("|");
      const content = [];

      if (displayMsg.length > 1) {
        content.push(<br></br>, <br></br>);
      }

      if (displayMsg[0].includes("{{")) {
        content.push(
          <p>
            {t(`${displayMsg[0]}`, {
              names: user.names,
              lastname: user.lastname,
            })}
          </p>
        );
      } else {
        content.push(<p>{t(`${displayMsg[0]}`)}</p>);
      }

      for (let i = 1; i < displayMsg.length; i++) {
        content.push(<p>{t(`${displayMsg[i]}`)}</p>);
      }

      if (displayMsg.length > 1) {
        content.push(<br></br>);
      }

      modal.warning({
        title: t("Restricted login"),
        content,
        autoFocusButton: null,
        okText: `${t("Agreed")}`,
      });
      return;
    }

    form.resetFields();

    user.token = token;

    dispatch(setUser(user));
    dispatch(setLoggedIn(true));

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("id", JSON.stringify(user.id));

    navigate("/dashboard");
    dispatch(setLocationPath("dashboard"));
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col xs={24} sm={24} md={16} style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ marginBottom: "0px", width: "100%" }}>
            {t("Log in")}
          </Title>
          <Paragraph style={{ width: "100%" }} strong>
            {t("Welcome back to your account")}
          </Paragraph>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Form
            name="login"
            form={form}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              width: "100%",
            }}
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={t("Email")}
              name="email"
              rules={[
                {
                  required: true,
                  message: `${t("Please input a email")}`,
                },
                {
                  type: "email",
                  message: `${t("Please input a valid email")}`,
                },
              ]}
            >
              <Input placeholder="email@smtp.com" />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your password")}`,
                },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>

            <Row style={{ justifyContent: "center", width: "100%" }}>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>{t("Remember me")}</Checkbox>
              </Form.Item>
            </Row>

            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 20,
                width: "100%",
              }}
            >
              <ReCaptcha setRecaptcha={setRecaptcha} />
            </Row>

            <Row style={{ justifyContent: "center", width: "100%" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!recaptcha}>
                  {t("Submit")}
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Row>
        <Link to={"/home/create-account"}>
          <Paragraph
            style={{
              color: token.colorPrimary,
              fontSize: 16,
              fontWeight: 700,
              marginBottom: 0,
              textAlign: "center",
              userSelect: "none",
              WebkitTextStrokeColor: token.colorWhite,
              WebkitTextStrokeWidth: "1px",
            }}
          >
            {t("Create an account")}
          </Paragraph>
        </Link>
        <Link to={"/auth/reset-password"}>
          <Paragraph
            style={{
              color: token.colorWhite,
              fontSize: 16,
              fontWeight: 700,
              marginTop: "8%",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {t("Have you forgotten your password")}
          </Paragraph>
        </Link>
      </Col>
    </Row>
  );
};
