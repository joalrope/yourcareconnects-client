import { Button, Checkbox, Col, Form, Input, App, Row } from "antd";
import { Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchWithoutToken } from "../../helpers/fetch";

const { Title } = Typography;

interface IRegister {
  company?: string;
  conditions?: boolean;
  confirmation?: string;
  email: string;
  names: string;
  password: string;
  phonenumber: string;
  surnames: string;
  role: string;
}

export const RegisterForm = () => {
  const { role: curRole } = useSelector((state: RootState) => state.user);
  const { modal } = App.useApp();
  const [form] = Form.useForm<IRegister>();
  const { t } = useTranslation();

  const conditionsValue = Form.useWatch("conditions", form) || false;

  const [hideBtn, setHideBtn] = useState<boolean>(conditionsValue);

  const onChange = (e: CheckboxChangeEvent) => {
    setHideBtn(e.target.checked);
  };

  const onFinish = async ({
    company,
    confirmation,
    email,
    names,
    password,
    phonenumber,
    surnames,
  }: IRegister) => {
    if (password !== confirmation) {
      modal.error({
        title: t("Invalid data!"),
        content: [
          <>
            <span>{t("Password and password confirmation do not match")}</span>
            <br />
            <br />
            <span>{t("Please input them again")}</span>
          </>,
        ],
        autoFocusButton: null,
        okText: `${t("Agreed")}`,
      });

      return;
    }

    const newUser: IRegister = {
      email,
      names,
      password,
      phonenumber,
      role: curRole ? curRole : "customer",
      surnames,
    };

    if (company) newUser.company = company;

    const result = await fetchWithoutToken("/users", newUser, "POST");

    if (result.ok) {
      modal.success({
        title: t("Successful registration!"),
        content: [
          <>
            <span key={1}>
              {t("Your account has been created successfully")}
            </span>
            <br key={2} />
            <br key={3} />
            <span key={4}>{t("Please login")}</span>
          </>,
        ],
        autoFocusButton: null,
        okText: `${t("Agreed")}`,
      });
      return;
    }

    modal.error({
      title: t("Error registration!"),
      content: [
        <>
          <span key={1}>
            {t("An error occurred while creating your account")}
          </span>
          <br key={2} />
          <br key={3} />
          <span key={4}>{t("Please try again")}</span>
        </>,
      ],
      autoFocusButton: null,
      okText: `${t("Agreed")}`,
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "50px 0px" }}>
            {`${t(curRole)} ${t("Create your account")}`}
          </Title>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Form
            name="register"
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
              conditions: false,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Form.Item
                label={t("Names")}
                name="names"
                rules={[
                  {
                    required: true,
                    message: `${t("Please input your names")}`,
                  },
                ]}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 15px)",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Names").toLowerCase()}`} />
              </Form.Item>

              <Form.Item
                label={t("Surnames")}
                name="surnames"
                rules={[
                  {
                    required: true,
                    message: `${t("Please input your surnames")}`,
                  },
                ]}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  display: "inline-block",
                  width: "calc(50% - 15px)",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Surnames").toLowerCase()}`} />
              </Form.Item>
            </Form.Item>

            {curRole === "provider" && (
              <Form.Item
                label={t("Company Name")}
                name="company"
                rules={[
                  {
                    required: false,
                    message: `${t("Please input your company name")}`,
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder={`${t("Company Name").toLowerCase()}`} />
              </Form.Item>
            )}

            <Form.Item
              label={t("Email")}
              name="email"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your email")}`,
                },
                {
                  type: "email",
                  message: `${t("Please input a valid email")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder="email@smtp.com" />
            </Form.Item>

            <Form.Item
              label={t("Phone number")}
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your phone number")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Phone number").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: `${t("Please input your password")}`,
                },
                {
                  min: 6,
                  message: `${t(
                    "Sorry, your password must be at least 6 characters"
                  )}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder={`${t("Password").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Confirm password")}
              name="confirmation"
              rules={[
                {
                  required: true,
                  message: `${t("Please confirm your password")}`,
                },
                {
                  min: 6,
                  message: `${t(
                    "Sorry, your password must be at least 6 characters"
                  )}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder={`${t("Password").toLowerCase()}`} />
            </Form.Item>

            <Form.Item name="conditions" valuePropName="checked">
              <Checkbox checked={hideBtn} onChange={onChange}>
                {t("I accept terms and conditions")}
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 12,
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="primary" htmlType="submit" disabled={!hideBtn}>
                {t("Get Into")}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
