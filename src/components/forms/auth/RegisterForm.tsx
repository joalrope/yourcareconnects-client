import { App, Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { fetchWithoutToken } from "../../../helpers/fetch";
import { useNavigate } from "react-router-dom";
import {
  setLoading,
  setLoggedIn,
  setRole,
  setUser,
} from "../../../store/slices";
import { getThereIsSuperadmin } from "../../../services";

const { Title } = Typography;

interface IRegister {
  company?: string;
  conditions?: boolean;
  confirmation?: string;
  email: string;
  names: string;
  password: string;
  phoneNumber: string;
  lastName: string;
  role: string;
  isActive?: boolean;
}

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [form] = Form.useForm<IRegister>();
  const { t } = useTranslation();

  const conditionsValue = Form.useWatch("conditions", form) || false;

  const [hideBtn, setHideBtn] = useState<boolean>(conditionsValue);
  const [thereIsSuperAdmin, setThereIsSuperAdmin] = useState<boolean>(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setHideBtn(e.target.checked);
  };

  useEffect(() => {
    const thereIsSuperadmin = async () => {
      const { result } = await getThereIsSuperadmin();

      setThereIsSuperAdmin(result);
    };

    thereIsSuperadmin();
  }, []);

  const onFinish = async ({
    company,
    confirmation,
    email,
    names,
    password,
    phoneNumber,
    lastName,
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
      phoneNumber,
      role: role ? role : "customer",
      lastName,
    };

    if (company) newUser.company = company;

    if (!thereIsSuperAdmin && company === "ABCD9876") {
      newUser.role = "superadmin";
      newUser.company = "Your Care Connects, LLC";
      newUser.isActive = true;
      setRole("superadmin");
    }

    dispatch(setLoading(true));

    const { ok, msg, result } = await fetchWithoutToken(
      "/users",
      newUser,
      "POST"
    );

    dispatch(setLoading(false));

    console.log({ newUser });

    if (ok) {
      if (newUser.role === "customer" || newUser.role === "superadmin") {
        modal.success({
          title: t("Successful registration"),
          content: (
            <>
              <span key={1}>
                {t("Your account has been created successfully")}
              </span>
              <br key={2} />
              <br key={3} />
              <span key={4}>{t("Please start to use your account")}</span>
            </>
          ),
          autoFocusButton: null,
          okText: `${t("Agreed")}`,
          onOk: () => {
            form.resetFields();
            dispatch(setUser(result.user));
            dispatch(setLoggedIn(true));
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("id", JSON.stringify(result.user.id));
            navigate("/dashboard");
          },
        });
      }

      if (newUser.role === "provider") {
        modal.success({
          title: t("Successful registration"),
          content: (
            <>
              <span key={1}>
                {t("Your account has been created successfully")}
              </span>
              <br key={2} />
              <span key={3}>
                {t("Please wait until your account is approved")}
              </span>
              <br key={4} />
              <br key={5} />
              <span key={6}>{t("Sorry for the inconvenience")}</span>
            </>
          ),
          autoFocusButton: null,
          okText: `${t("Agreed")}`,
          onOk: () => {
            form.resetFields();
            navigate("/login");
          },
        });
      }
    } else {
      modal.error({
        title: t("Error registration"),
        content: (
          <>
            <span key={1}>
              {t("An error occurred while creating your account")}
            </span>
            <br />
            <span>{t(msg)}</span>
            <br key={2} />
            <br key={3} />
            <span key={4}>{t("Please try again")}</span>
          </>
        ),
        autoFocusButton: null,
        okText: `${t("Agreed")}`,
      });
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "50px 0px" }}>
            {`${t("Create your account as a")} ${t(`${role}`)}`}
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
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label={t("Names")}
                  name="names"
                  rules={[
                    {
                      required: true,
                      message: `${t("Please input your names")}`,
                    },
                  ]}
                  style={{
                    width: "100%",
                    marginBottom: "6px",
                  }}
                >
                  <Input placeholder={`${t("Names").toLowerCase()}`} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12}>
                <Form.Item
                  label={t("Last Name")}
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: `${t("Please input your surnames")}`,
                    },
                  ]}
                  style={{
                    width: "100%",
                    marginBottom: "6px",
                  }}
                >
                  <Input placeholder={`${t("Last Name").toLowerCase()}`} />
                </Form.Item>
              </Col>
            </Row>

            {role === "provider" && (
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
              name="phoneNumber"
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
