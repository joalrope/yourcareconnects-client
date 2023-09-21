import { App, Button, Col, Form, Input, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { changePassword } from "../../../../../services";

const { Paragraph, Title } = Typography;

export const ChangePasword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { init, id, code } = useParams();
  const token = `${init}${id}${code}`;

  const onFinish = async (values: { password: string; confirm: string }) => {
    const { password, confirm } = values;

    if (password !== confirm) {
      message.error(`${t("Passwords do not match")}`);
      return;
    }

    const { ok } = await changePassword(token, password);

    if (!ok) {
      message.error(`${t("Error while change password")}`);
      navigate("/");
      return;
    }

    message.success(`${t("Password changed successfully")}`);
    navigate("/");
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            flexDirection: "column",
            justifyItems: "flex-start",
            width: "100%",
          }}
        >
          <Title
            style={{
              marginBottom: 0,
              marginTop: "2%",
              userSelect: "none",
            }}
            level={3}
          >
            {t("Change password")}
          </Title>
          <Paragraph style={{ marginTop: "2%", userSelect: "none" }}>
            {t("You can change your password")}
          </Paragraph>
        </Row>

        <Row
          style={{ justifyContent: "center", marginTop: "3%", width: "100%" }}
        >
          <Form
            name="changePassword"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              width: "100%",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={t("Enter your pasword")}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t("Please input a password")}`,
                },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <Form.Item
              label={t("Confirm your pasword")}
              name="confirm"
              rules={[
                {
                  required: true,
                  message: `${t("Please confirm a password")}`,
                },
              ]}
            >
              <Input.Password placeholder="Input your confirm password" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 6,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: "30%" }}
              >
                {t("Change my password")}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
