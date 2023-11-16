import { Button, Col, Form, Modal, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { CategorySelect } from "../../../ui-components/category-select/CategorySelect";
import {
  IDataProvider,
  ProviderCard,
} from "../../../ui-components/provider-card/ProviderCard";
import { useEffect, useState } from "react";
import { getServicesToSearch } from "../../../../helpers/services";
import { MapView } from "../..";
import { IMarker } from "../../../ui-components/map/MapView";
import { getUserByServices } from "../../../../services";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useContent } from "../../../../hooks/useContent";

const { Title } = Typography;

interface Props {
  ok: boolean;
  services: string[];
}

export const SearchServices = () => {
  const [providers, setProviders] = useState<IDataProvider[]>([]);
  const [areThereUsers, setAreThereUsers] = useState<boolean>(true);
  const [searchServices, setSearchServices] = useState<string | undefined>("");
  const [selSrvices, setSelSrvices] = useState<string[]>([]);
  const [viewMap, setViewMap] = useState<boolean>(false);
  const content = useContent();

  const [form] = Form.useForm<Props>();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { t } = useTranslation();

  const onFinish = async (values: Props) => {
    setProviders([]);
    setSelSrvices(values.services);

    if (values.services.length === 1) {
      values.services.push("");
    }

    const {
      ok,
      msg,
      result: { users },
    } = await getUserByServices(values.services);

    if (!ok) {
      console.log(msg);
      setAreThereUsers(false);
    }

    if (users.length >= 1) {
      setProviders(users);
      setAreThereUsers(true);
    }

    form.resetFields();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const HandleViewOnMap = () => {
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

  useEffect(() => {
    const valuesToSearch = getServicesToSearch(selSrvices)
      .split(",")
      .map((service) => {
        return t(service.trim());
      })
      .join(", ");

    setSearchServices(valuesToSearch);
  }, [selSrvices, language, t]);

  return viewMap ? (
    <MapView markers={providers as IMarker[]} goBack={setViewMap} />
  ) : (
    <>
      <Row
        align={"middle"}
        justify={"center"}
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5%",
          padding: 24,
        }}
      >
        <Col xs={24} md={16} lg={12}>
          <Title level={3}>{t("Search Services")}</Title>
        </Col>
        <Col xs={24} md={16} lg={16} style={{ width: "100%" }}>
          <Form
            name="providerProfile"
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

            <Row style={{ alignItems: "center", flexDirection: "column" }}>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginRight: 8, marginTop: 32, width: 200 }}
                >
                  {t("Search")}
                </Button>
                {searchServices && (
                  <Button
                    type="primary"
                    onClick={HandleViewOnMap}
                    style={{ marginLeft: 8, marginTop: 32, width: 200 }}
                  >
                    {t("View on Map")}
                  </Button>
                )}
              </Col>
              {searchServices && (
                <Col style={{ paddingTop: 32 }}>
                  <h3>
                    {t("Looking for providers that provide the service of:")}
                    <u>
                      {" "}
                      <b style={{ color: "blue" }}> {searchServices}</b>
                    </u>
                  </h3>
                </Col>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          padding: 24,
        }}
      >
        {!areThereUsers ? (
          <h3 style={{ color: "red" }}>
            {t("There are no providers that provide the requested service")}
          </h3>
        ) : (
          providers.map((provider: IDataProvider) => {
            return (
              <Col
                key={provider.id}
                xs={24}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
              >
                <ProviderCard {...provider} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};
