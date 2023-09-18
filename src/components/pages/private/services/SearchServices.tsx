import { Button, Col, Form, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CategorySelect } from "../../../ui-components/CategorySelect";
import { getUserByServices } from "../../../../services/userService";
import {
  IProvCardProps,
  ProviderCard,
} from "../../../ui-components/ProviderCard";
import { useState } from "react";
//import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Props {
  ok: boolean;
  services: string[];
}

export const SearchServices = () => {
  const [providers, setProviders] = useState<IProvCardProps[]>([]);
  //const navigate = useNavigate();
  const [form] = Form.useForm<Props>();
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const onFinish = async (values: Props) => {
    //
    const { ok, msg, results } = await getUserByServices(values.services);

    if (!ok) {
      console.log(msg);
    }

    setProviders(results);

    if (providers) {
      form.resetFields();
      //navigate("/dashboard");
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {providers.map((provider: IProvCardProps) => (
          <Col
            key={provider.id}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 6 }}
            xl={{ span: 4 }}
            xxl={{ span: 3 }}
          >
            <ProviderCard {...provider} />
          </Col>
        ))}
      </Row>
    </>
  );
};
