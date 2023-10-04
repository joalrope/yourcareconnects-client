import { useTranslation } from "react-i18next";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  //SelectProps,
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
import { SetStateAction, useEffect, useState } from "react";
import { getUserById, updateUserById } from "../../../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { getGeolocation } from "../../../helpers/geolocation";
import { getModalities } from "../../../services";
import { IUser } from "../../../interface";

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

export interface IModality {
  title: string | Element;
  value: string;
  tagColor?: string;
}

const baseUrl = import.meta.env.VITE_URL_BASE;

export const ProviderForm = () => {
  const { id } = useSelector((state: RootState) => state.user);
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      url: `${baseUrl}/images/${id}/profile.png`,
      name: "profile.png",
    },
  ]);
  const [modalities, setModalities] = useState<IModality[]>([]);
  const [user, setUser] = useState<IUser>();

  const pictureName = "profile";

  const uploadDocs: UploadProps = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const ssId = sessionStorage.getItem("id");
      const id = ssId ? JSON.parse(ssId) : "";

      const { ok, result } = await getUserById(id);

      if (ok) {
        setUser(result);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const {
        result: { modalities },
      } = await getModalities();

      console.log(modalities);

      const data = modalities.map((modality) => {
        return {
          title: (
            <Row>
              <Col
                xs={24}
                style={{
                  backgroundColor: `${modality.tagColor}20`,
                  border: `1px solid ${modality.tagColor}`,
                  color: modality.tagColor,
                  borderRadius: 4,
                  paddingInline: 12,
                }}
              >
                {`${modality.title}`}
              </Col>
            </Row>
          ),
          value: modality.title,
        };
      });
      setModalities(data as unknown as SetStateAction<IModality[]>);
    };

    fetchData();
  }, []);

  const onFinish = async (values: IProvider) => {
    console.log({ fileList });
    let { ok, msg } = await handleUpload(fileList, pictureName);

    if (!ok) {
      message.error(t(`${msg}`));
    }

    setFileList([]);

    console.log("on finish");

    const result = await updateUserById(id, values);

    ({ ok, msg } = result);

    if (!ok) {
      message.error(t(`${msg}`));
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
          {user && (
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
                ...user,
                conditions: false,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row
                gutter={16}
                style={{
                  marginInline: "0px",
                  width: "100%",
                }}
              >
                <Col
                  xs={24}
                  sm={24}
                  md={7}
                  lg={7}
                  style={{ paddingInline: 0, width: "100%" }}
                >
                  <Form.Item
                    label={t("Image")}
                    name={pictureName}
                    //valuePropName="fileList"
                    //getValueFromEvent={normFile}
                    rules={[{ required: false }]}
                    style={{
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <ProfilePicture
                      form={form}
                      pictureName={pictureName}
                      fileList={fileList}
                      setFileList={setFileList}
                    />
                  </Form.Item>
                </Col>

                <Col
                  xs={24}
                  sm={24}
                  md={17}
                  lg={17}
                  style={{ paddingInline: 0, width: "100%" }}
                >
                  <Form.Item
                    label={t("Biography")}
                    name="biography"
                    style={{
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <Input.TextArea
                      rows={4}
                      style={{ height: 103, resize: "none" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

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

              <Row
                gutter={16}
                style={{
                  justifyContent: "space-between",
                  marginInline: "0px",
                  width: "100%",
                }}
              >
                <Col
                  xs={24}
                  sm={24}
                  md={11}
                  lg={11}
                  style={{ paddingInline: 0, width: "100%" }}
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
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <Input placeholder={`${t("Zip code").toLowerCase()}`} />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={11}
                  lg={11}
                  style={{ paddingInline: 0, width: "100%" }}
                >
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
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <Input placeholder={`${t("Phone number").toLowerCase()}`} />
                  </Form.Item>
                </Col>
              </Row>

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
                label={t("Licenses and certificates to provide services")}
                name="certificates"
                style={{
                  width: "100%",
                  marginBottom: "6px",
                }}
              >
                <Upload {...uploadDocs}>
                  <Button type="primary" icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
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
          )}
        </Row>
      </Col>
    </Row>
  );
};
