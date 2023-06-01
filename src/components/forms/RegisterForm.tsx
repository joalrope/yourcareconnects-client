import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Typography } from "antd";

const { Title } = Typography;

export const RegisterForm = () => {
  const onFinish = (values: unknown) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const role = "provider";

  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "50px 0px" }}>
            Create your account
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
              remember: false,
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
                label="Names"
                name="names"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
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
                <Input placeholder="names" />
              </Form.Item>

              <Form.Item
                label="Surnames"
                name="surnames"
                rules={[
                  {
                    required: true,
                    message: "Please input your surnames!",
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
                <Input placeholder="surnames" />
              </Form.Item>
            </Form.Item>

            {role === "provider" && (
              <Form.Item
                label="Company name"
                name="company"
                rules={[
                  {
                    required: false,
                    message: "Please input your company name!",
                  },
                ]}
                style={{
                  width: "100%",
                  marginBottom: "6px",
                }}
              >
                <Input placeholder="company name" />
              </Form.Item>
            )}

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder="phone number" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirmation"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item name="conditions" valuePropName="checked">
              <Checkbox>Terms and conditions</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 10,
                span: 12,
              }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
