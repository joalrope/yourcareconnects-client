import {
  App,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { useTranslation } from "react-i18next";
import type { UploadProps } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { CategorySelect } from "../../../ui-components/category-select/CategorySelect";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useNavigate } from "react-router-dom";
import { getModalities, updateUserById } from "../../../../services";
import { setUser } from "../../../../store/slices";
import { setLocationPath } from "../../../../store/slices/router/routerSlice";
2;
import { ChangeProfilePicture } from "../../picture/ChangeProfilePicture";
import { IModality, IProvider } from "./interfaces";
import { MapView } from "../../../pages";
import { FormItemInput } from "../../../ui-components/FormItemInput";
import { useContent } from "../../../../hooks/useContent";

const { Title } = Typography;

export const ProviderForm = () => {
  const user = useSelector((state: RootState) => state.user);
  const { id, role } = user;
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const content = useContent();

  const [modalities, setModalities] = useState<IModality[]>([]);
  const [viewMap, setViewMap] = useState<boolean>(false);

  const uploadDocs: UploadProps = {
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        result: { modalities },
      } = await getModalities();

      const data = modalities.map((modality) => {
        return {
          key: modality.title,
          title: (
            <Row>
              <Col
                xs={24}
                style={{
                  backgroundColor: `${"red"}20`,
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
    const {
      ok,
      msg,
      result: { user },
    } = await updateUserById(id, values);

    if (!ok) {
      message.error(t(`${msg}`));
    }

    dispatch(setUser(user));

    form.resetFields();
    message.success(t(`${msg}`));
    dispatch(setLocationPath("dashboard"));
    navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const HandleGeoloc = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        Modal.info({
          title: t("Please activate Geolocation permission"),
          content,
          width: "50%",
          okText: t("Agreed"),
          autoFocusButton: "ok",
          onOk() {
            setViewMap(false);
          },
        });
        return;
      }
      setViewMap(true);
    });
  };

  const getLoc = (loc: { lat: number; lng: number }) => {
    form.setFieldValue("location", {
      type: "Point",
      coordinates: [loc.lng, loc.lat],
    });
    return loc;
  };

  useEffect(() => {
    const defaultValues = {
      id: user.id,
      address: user.address,
      biography: user.biography,
      certificates: user.certificates,
      company: user.company,
      contacts: user.contacts,
      faxNumber: user.faxNumber,
      owner: user.owner,
      phoneNumber: user.phoneNumber,
      serviceModality: user.serviceModality,
      services: user.services,
      webUrl: user.webUrl,
      zipCode: user.zipCode,
    };

    form.setFieldsValue({
      services: [],
    });

    form.setFieldsValue({
      ...defaultValues,
    } as unknown as IProvider);
  }, [
    form,
    user.address,
    user.biography,
    user.certificates,
    user.company,
    user.contacts,
    user.faxNumber,
    user.id,
    user.owner,
    user.phoneNumber,
    user.serviceModality,
    user.services,
    user.webUrl,
    user.zipCode,
  ]);

  return viewMap ? (
    <MapView getLoc={getLoc} goBack={setViewMap} />
  ) : (
    <Row justify={"center"} style={{ padding: 24, width: "100%" }}>
      <Col xs={24} sm={24} lg={16}>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Title level={3} style={{ margin: "25px 0px" }}>
            {t(`${role?.charAt(0).toUpperCase()}${role?.slice(1)} profile`)}
          </Title>
        </Row>

        <Row
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <ChangeProfilePicture />

          {
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row
                gutter={[24, 32]}
                style={{
                  flexDirection: "row",
                  marginInline: "0px",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Col
                  style={{
                    display: "inline",
                    paddingInline: 0,
                    flexGrow: 1,
                  }}
                >
                  <Form.Item
                    label={t("Biography")}
                    name="biography"
                    style={{
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <Input.TextArea rows={3} style={{ resize: "none" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={16} lg={16}>
                  {role !== "customer" && (
                    <FormItemInput name="company" label="Company Name" />
                  )}
                </Col>

                <Col xs={24} sm={24} md={8} lg={8}>
                  {role !== "customer" && (
                    <FormItemInput name="owner" label="Owner's name" />
                  )}
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={18} lg={18}>
                  <FormItemInput name="address" label="Physical address" />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                  <Form.Item
                    label={t("GeoLoc address")}
                    name="location"
                    style={{
                      width: "100%",
                      marginBottom: "6px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={HandleGeoloc}
                      style={{ width: "100%" }}
                    >
                      {t("Get location")}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <FormItemInput name="zipCode" label="Zip code" />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <FormItemInput name="phoneNumber" label="Phone number" />
                </Col>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <FormItemInput name="faxNumber" label="Fax number" />
                </Col>
              </Row>

              {role !== "customer" && (
                <FormItemInput name="webUrl" label="Web Page" />
              )}

              {role !== "customer" && (
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
                    initValues={user.services}
                    formatted={true}
                    editable={true}
                    sortable={true}
                  />
                </Form.Item>
              )}

              {role !== "customer" && (
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
                    tokenSeparators={[","]}
                    options={modalities}
                    placeholder={`${t("Service modality").toLowerCase()}`}
                  />
                </Form.Item>
              )}

              {role !== "customer" && (
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
                      {t("Upload")}
                    </Button>
                  </Upload>
                </Form.Item>
              )}

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
                  style={{ marginTop: "24px" }}
                >
                  {t("Save")}
                </Button>
              </Form.Item>
            </Form>
          }
        </Row>
      </Col>
    </Row>
  );
};
