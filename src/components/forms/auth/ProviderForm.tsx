import { useTranslation } from "react-i18next";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Typography,
  Upload,
} from "antd";

import type { UploadFile, UploadProps } from "antd/es/upload/interface";

import { UploadOutlined } from "@ant-design/icons";
import { CategorySelect } from "../../ui-components/CategorySelect";
import {
  ProfilePicture,
  handleUpload,
} from "../../ui-components/ProfilePicture";
import { useState } from "react";
import { updateUserById } from "../../../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { getGeolocation } from "../../../helpers/geolocation";

const { Title } = Typography;

export interface IProvider {
  id: string;
  company: string;
  owner: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  faxNumber: string;
  webUrl: string;
  services: string[];
  certificates: string[];
  serviceModality: string;
}

export const ProviderForm = () => {
  const { id } = useSelector((state: RootState) => state.user);
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const modalities: SelectProps["options"] = [];

  const pictureName = "profile";

  const props: UploadProps = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  modalities.push(
    {
      value: "At home",
      label: "At home",
    },
    {
      value: "Delivery",
      label: "Delivery",
    },
    {
      value: "Remote",
      label: "Remote",
    },
    {
      value: "Hour shifts",
      label: "Hour shifts",
    }
  );

  const onFinish = async (values: IProvider) => {
    const { ok, msg } = await handleUpload(fileList, pictureName);

    if (!ok) {
      message.error(t(`${msg}`));
    }

    setFileList([]);

    const { ok: okII, msg: msgII } = await updateUserById(id, values);

    if (!okII) {
      message.error(t(`${msgII}`));
    }

    form.resetFields();
    message.success(`${msg}`);
    navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const getUserGeolocation = () => {
    getGeolocation();
  };

  return (
    <Row justify={"center"} style={{ width: "100%" }}>
      <Col style={{ width: "85%" }}>
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
              name={pictureName}
              //valuePropName="fileList"
              //getValueFromEvent={normFile}
              rules={[{ required: true }]}
            >
              <ProfilePicture
                form={form}
                pictureName={pictureName}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>
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
              name="owner"
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
              <Input
                onFocus={getUserGeolocation}
                placeholder={`${t("Physical address").toLowerCase()}`}
              />
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
                name="zipCode"
                /*rules={[
                  {
                    required: true,
                    message: `${t(
                      "Please input the zip code of your residence"
                    )}`,
                  },
                ]}*/
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
                name="phoneNumber"
                /*rules={[
                  {
                    required: true,
                    message: `${t("Please input your phone number")}`,
                  },
                ]}*/
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
              name="certificates"
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
              name="faxNumber"
              style={{
                width: "100%",
                marginBottom: "6px",
              }}
            >
              <Input placeholder={`${t("Fax number").toLowerCase()}`} />
            </Form.Item>

            <Form.Item
              label={t("Web Page")}
              name="webUrl"
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
              <CategorySelect
                form={form}
                formatted={true}
                editable={true}
                sortable={true}
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
                // onChange={handleChange}
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
