import { Button, Col, Form, Row, Typography } from "antd";
import { CategorySelect } from "../../../ui-components/CategorySelect";
import { useTranslation } from "react-i18next";
import { getUserByServices } from "../../../../services/userService";
//import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Props {
  ok: boolean;
  services: string[];
}

export const SearchServices = () => {
  //const navigate = useNavigate();
  const [form] = Form.useForm<Props>();
  const { t } = useTranslation();

  const onFinish = async (values: Props) => {
    console.log({ values });

    const ok = await getUserByServices(
      values.services
    ); /*await fetchWithToken(`/users/${id}`, values, "PUT");*/

    console.log(ok);

    if (ok) {
      form.resetFields();
      //navigate("/dashboard");
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      align={"middle"}
      justify={"center"}
      style={{ display: "flex", flexDirection: "column", marginTop: "5%" }}
    >
      <Col xs={24} md={16} lg={12}>
        <Title level={3}>{t("Search Services")}</Title>
      </Col>
      <Col xs={24} md={16} lg={12} style={{ width: "100%" }}>
        <Form
          name="providerRegister"
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
            conditions: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={t("Select one or more services")}
            name="services"
            style={{
              width: "100%",
              marginBottom: "6px",
            }}
            rules={[
              {
                required: true,
                message: `${t("Please select at least a service")}`,
              },
            ]}
          >
            <CategorySelect
              form={form}
              formatted={true}
              editable={false}
              sortable={true}
            />
          </Form.Item>

          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "10px", width: "200px" }}
            >
              {t("Search")}
            </Button>
          </Col>
        </Form>
      </Col>
    </Row>
  );
};
