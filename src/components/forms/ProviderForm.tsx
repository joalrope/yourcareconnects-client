import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Tag,
  Typography,
  Upload,
  UploadProps,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface IProvider {
  company: string;
  owner: string;
  address: string;
  postalCode: string;
  phone: string;
  fax: string;
  webUrl: string;
  services: string[];
  certificates: string[];
  serviceModality: string;
  description: string;
}

export const ProviderForm = () => {
  const { t } = useTranslation();

  const services: SelectProps["options"] = [];
  const modalities: SelectProps["options"] = [];

  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagRender = (props: any) => {
    const { label, /*  value, */ closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={"#f2CA61"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  services.push(
    {
      value: "1",
      label: "Massage",
    },
    {
      value: "2",
      label: "Limpieza de Hogar",
    },
    {
      value: "3",
      label: "Lavado de vehiculos",
    },
    {
      value: "4",
      label: "Cuidado de Adultos mayores",
    },
    {
      value: "5",
      label: "Paseo de mascotas",
    },
    {
      value: "6",
      label: "Peluquería a Domicilio",
    }
  );

  modalities.push(
    {
      value: "1",
      label: "At home",
    },
    {
      value: "2",
      label: "Delivery",
    },
    {
      value: "3",
      label: "Remote",
    },
    {
      value: "4",
      label: "Hour shifts",
    }
  );

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = ({
    company,
    owner,
    address,
    postalCode,
    phone,
    fax,
    webUrl,
    services,
    certificates,
    serviceModality,
    description,
  }: IProvider) => {
    console.log("Success:", {
      company,
      owner,
      address,
      postalCode,
      phone,
      fax,
      webUrl,
      services,
      serviceModality,
      certificates,
      description,
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row style={{ width: "100%" }}>
      <Col style={{ width: "100%" }}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "25px 0px" }}>
            {t("Provider form")}
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

            <Form.Item
              label={t("Owner's name")}
              name="ownerName"
              rules={[
                {
                  required: false,
                  message: `${t("Please input Owner's name")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Owner's name").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Physical address")}
              name="address"
              rules={[
                {
                  required: false,
                  message: `${t("Please input your physical address")}`,
                },
              ]}
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Physical address").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              style={{
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Form.Item
                label={t("Zip code")}
                name="postalCode"
                rules={[
                  {
                    required: true,
                    message: `${t(
                      "Please input the zip code of your residence"
                    )}`,
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
                <Input placeholder={`${t("Zip code").toLowerCase()}`} />
              </Form.Item>

              <Form.Item
                label={t("Phone number")}
                name="phone"
                rules={[
                  {
                    required: true,
                    message: `${t("Please input your phone number")}`,
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
                <Input placeholder={`${t("Phone number").toLowerCase()}`} />
              </Form.Item>
            </Form.Item>

            <Form.Item
              label={t("Licenses and certificates to provide services")}
              name="fax"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label={t("Fax number")}
              name="fax"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Fax number").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Web Page")}
              name="fax"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Web Page").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Select one or more services to provide")}
              name="services"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                defaultValue={["gold", "cyan"]}
                style={{ width: "100%" }}
                options={services}
              />
            </Form.Item>

            <Form.Item
              label={t("Service modality")}
              name="serviceModality"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                onChange={handleChange}
                tokenSeparators={[","]}
                options={modalities}
                placeholder={`${t("Service modality").toLowerCase()}`}
              />
            </Form.Item>

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
                style={{ marginTop: "25px" }}
              >
                {t("Save")}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
