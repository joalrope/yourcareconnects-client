import { useState } from "react";
import { App, Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Typography } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchWithoutToken } from "../../../helpers/fetch";
import { useNavigate } from "react-router-dom";
import {
  setLoading,
  setLoggedIn,
  setRole,
  setUser,
} from "../../../store/slices";
import { setLocationPath } from "../../../store/slices/router/routerSlice";
import { ReCaptcha } from "../../ui-components/ReCaptcha";

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

const superadminCode = import.meta.env.VITE_SUPERADMIN_CODE;

export const RegisterForm = ({ role }: { role: string }) => {
  const dispatch = useDispatch();
  //const { role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const { modal } = App.useApp();
  const [form] = Form.useForm<IRegister>();
  const { t } = useTranslation();

  const conditionsValue = Form.useWatch("conditions", form) || false;

  const [hideBtn, setHideBtn] = useState<boolean>(conditionsValue);
  const [recaptcha, setRecaptcha] = useState<boolean>(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setHideBtn(e.target.checked);
  };

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

    if (company === superadminCode) {
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
            dispatch(setLocationPath("dashboard"));
            navigate("/dashboard");
          },
        });
      }

      if (newUser.role === "provider") {
        modal.success({
          title: t("Successful registration"),
          content: [
            <span>
              {t(
                "{{names}} {{lastname}}, your account has been created successfully",
                {
                  names: result.user.names,
                  lastname: result.user.lastName,
                }
              )}
            </span>,
            <br />,
            <span>{t("Please wait until your account is approved")}</span>,
            <br />,
            <br />,
            <span>{t("We are sorry for the inconvenience caused")}</span>,
          ],
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
        content: [
          <span>{t("An error occurred while creating your account")}</span>,
          <br></br>,
          <span>{t(msg)}</span>,
          <br></br>,
          <br></br>,
          <span>{t("Please try again")}</span>,
        ],
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
          <Title level={3} style={{ margin: "5% 0px" }}>
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

            <Form.Item
              name="conditions"
              valuePropName="checked"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Checkbox checked={hideBtn} onChange={onChange}>
                {t("I accept terms and conditions")}
              </Checkbox>
            </Form.Item>
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
            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 12,
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={!(hideBtn && recaptcha)}
              >
                {t("Get Into")}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
