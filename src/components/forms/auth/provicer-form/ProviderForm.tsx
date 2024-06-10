import { SetStateAction, useEffect, useRef, useState } from "react";
import { App, Button, Checkbox, CheckboxProps, Col, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Row, Select, Typography } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { RootState } from "../../../../store";
import { useNavigate } from "react-router-dom";
import {
  docDeleteService,
  getFilesService,
  getModalities,
  updateUserById,
} from "../../../../services";
import { setUser } from "../../../../store/slices";
import { setLocationPath } from "../../../../store/slices/router/routerSlice";
import { CategorySelect } from "../../../ui-components/category-select/CategorySelect";
import { IModality, IProvider } from "./interfaces";
import { FormItemInput } from "../../../ui-components/FormItemInput";
import { UserProfileImage } from "../../../ui-components/user-profile-image/UserProfileImage";
import { UploadDocs } from "../../../ui-components/UploadDocs";
import { GetLocationMap } from "../../../pages";

const { Title, Text } = Typography;

export const ProviderForm = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const { id, role } = user;
  const [modalities, setModalities] = useState<IModality[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        ok,
        result: { fileList },
      } = await getFilesService(String(user.id), "docs");

      if (ok) {
        setFileList([...fileList]);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValues = useRef({
    id: user.id,
    email: user.email,
    address: user.address,
    biography: user.biography,
    certificates: user.certificates,
    company: user.company,
    contacts: user.contacts,
    isAllowedViewData: user.isAllowedViewData,
    faxNumber: user.faxNumber,
    owner: user.owner,
    phoneNumber: user.phoneNumber,
    serviceModality: user.serviceModality,
    services: user.services,
    webUrl: user.webUrl,
    zipCode: user.zipCode,
  });

  useEffect(() => {
    const values = defaultValues.current;

    form.setFieldsValue({
      services: [],
    });

    form.setFieldsValue({
      ...values,
    } as unknown as IProvider);
  }, [form]);

  /*  const getLoc = (loc: { lat: number; lng: number }) => {
    form.setFieldValue("location", {
      type: "Point",
      coordinates: [loc.lng, loc.lat],
    });
    return loc;
  }; */

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRemove = async (file: any) => {
    const { ok, msg } = await docDeleteService(String(id), file.name);
    if (!ok) {
      message.error(t(`${msg}`));
      return;
    }
    setFileList((prev) => prev.filter((f) => f.name !== file.name));
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    form.setFieldsValue({ isAllowedViewData: e.target.checked });
  };

  return (
    <Row
      className="animate__animated animate__fadeIn animate__delay-0.3s"
      justify={"center"}
      style={{ padding: 24, width: "100%" }}
    >
      <Col xs={24} sm={24} lg={16}>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
          }}
        >
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
              <Col>
                <Form.Item
                  name="pictures"
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    marginTop: "15px",
                  }}
                >
                  <UserProfileImage form={form} />
                </Form.Item>
              </Col>
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
                  <Input.TextArea
                    size="large"
                    rows={3}
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </Col>
            </Row>

            {role === "superadmin" && (
              <FormItemInput name="email" label="Email" />
            )}

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
              <Col xs={24} sm={24} md={24} lg={24}>
                <FormItemInput name="address" label="Physical address" />
              </Col>
              {/* <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item
                  label={t("GeoLoc address")}
                  name="location"
                  style={{
                    width: "100%",
                    marginBottom: "6px",
                  }}
                >
                  <Button
                    size="large"
                    type="primary"
                    onClick={HandleGeoloc}
                    style={{ width: "100%" }}
                  >
                    <Text style={{ maxWidth: "100%" }} ellipsis={true}>
                      {t("Geolocation")}
                    </Text>
                  </Button>
                </Form.Item>
              </Col> */}
            </Row>

            <Row style={{ marginTop: 24, width: "100%" }}>
              <Form.Item
                name="isAllowedViewData"
                valuePropName="checked"
                style={{
                  width: "100%",
                  marginBottom: "6px",
                  userSelect: "none",
                }}
              >
                <Checkbox onChange={onChange}>
                  {t(
                    "Allow them to see my personal information (phone, email)"
                  )}
                </Checkbox>
              </Form.Item>
            </Row>

            <Row style={{ width: "100%" }}>
              <Row
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "8px",
                  justifyContent: "space-between",
                  margin: "24px 0px 8px",
                  width: "100%",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    userSelect: "none",
                  }}
                >
                  <Text>{t("Set your Geolocation on the map")}</Text>
                </Col>
                {/*
                  <Col>
                    <Button
                      type="primary"
                      onClick={HandleGeoloc}
                      style={{ border: "1px solid black" }}
                    >
                      {t("Click t maximize the map")}
                    </Button>
                  </Col>
                  */}
              </Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                style={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  margin: "8px 0px",
                  padding: "3px",
                  width: "100%",
                }}
              >
                <GetLocationMap
                  mapStyles={{ width: "100%", height: "300px" }}
                />
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
                  userSelect: "none",
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
                  userSelect: "none",
                }}
              >
                <Select
                  size="large"
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
                label={t(
                  "Licenses and certificates to provide services (Max.: 5 files)"
                )}
                style={{
                  width: "100%",
                  marginBottom: "6px",
                  userSelect: "none",
                }}
              >
                <UploadDocs
                  id={String(id)}
                  fileType="docs"
                  fileList={fileList}
                  setFileList={setFileList}
                  maxCount={5}
                  onRemove={onRemove}
                />
              </Form.Item>
            )}

            <Form.Item style={{ width: "100%" }}>
              <Row style={{ justifyContent: "center", width: "100%" }}>
                <Col xs={24} sm={24} md={8} lg={8}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{ marginTop: "96px", width: "100%" }}
                  >
                    {t("Save")}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};
