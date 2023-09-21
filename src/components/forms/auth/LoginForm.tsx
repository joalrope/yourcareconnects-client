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
import { setUser } from "../../../store/slices";
import { setLocationPath } from "../../../store/slices/router/routerSlice";
import { loginUser } from "../../../services";

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

  const onFinish = async ({ email, password }: ILoginData) => {
    const userData: ILoginData = {
      email,
      password,
    };

    const { ok, msg, result } = await loginUser(userData);

    if (ok) {
      form.resetFields();
      result.user.token = result.token;
      dispatch(setUser(result.user));
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("id", JSON.stringify(result.user.id));
      navigate("/dashboard");
      dispatch(setLocationPath("dashboard"));
      return;
    }

    modal.error({
      title: t("Error login"),
      content: (
        <>
          <span key={1}>{t(`${msg}`)}</span>
          <br key={2} />
          <br key={3} />
          <span key={4}>{t("Please try again")}</span>
        </>
      ),
      autoFocusButton: null,
      okText: `${t("Agreed")}`,
    });
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "70%", justifyContent: "center" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ marginBottom: "0px", width: "100%" }}>
            {t("Login in")}
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

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>{t("Remember me")}</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                {t("Submit")}
              </Button>
            </Form.Item>
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
