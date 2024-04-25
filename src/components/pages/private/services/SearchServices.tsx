import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../../store";
import { setClearProviders, setProviders } from "../../../../store/slices";
import { Button, Col, Form, Modal, Row, Typography } from "antd";
import { CategorySelect } from "../../../ui-components/category-select/CategorySelect";
import { ProviderCard } from "../../../ui-components/provider-card/ProviderCard";
import { getServicesToSearch } from "../../../../helpers/services";
import {
  ILocation,
  IMarker,
  MapView,
} from "../../../ui-components/map/MapView";
import { getUserByServices } from "../../../../services";
import { useContent } from "../../../../hooks/useContent";
import { getCenter } from "../../../ui-components/map/utils/getLocation";
import { IProvider } from "../../../../interface/provider";

const { Title } = Typography;

interface Props {
  ok: boolean;
  services: string[];
}

export const SearchServices = () => {
  const dispatch = useDispatch();
  //const [providers, setProviders] = useState<IProvider[]>([]);
  const providers = useSelector((state: RootState) => state.providers);
  const [areThereUsers, setAreThereUsers] = useState<boolean>(true);
  const [searchServices, setSearchServices] = useState<string | undefined>("");
  const [selSrvices, setSelSrvices] = useState<string[]>([]);
  const [viewMap, setViewMap] = useState<boolean>(false);
  const content = useContent();

  const [form] = Form.useForm<Props>();
  const { location } = useSelector((state: RootState) => state.user);
  const { language } = useSelector((state: RootState) => state.i18n);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setClearProviders());
  }, [dispatch]);

  const onFinish = async (values: Props) => {
    dispatch(setClearProviders());
    setSelSrvices(values.services);

    if (values.services.length === 1) {
      values.services.push("");
    }

    const {
      ok,
      result: { users },
    } = await getUserByServices(values.services, location);

    if (!ok) {
      setAreThereUsers(false);
    }

    if (users.length >= 1) {
      const usersMarkers = users.map((user: IProvider) => {
        const userLocation = getCenter(user.location as ILocation);

        return {
          id: user.id,
          location: userLocation,
          fullname: user.fullname,
          pictures: user.pictures,
          services: user.services,
          ratings: user.ratings,
          role: user.role,
        };
      });

      console.log({ usersMarkers });

      dispatch(setProviders(usersMarkers));
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
    <MapView markers={providers as unknown as IMarker[]} goBack={setViewMap} />
  ) : (
    <>
      <Row
        className="animate__animated animate__fadeIn animate__delay-0.3s"
        align={"middle"}
        justify={"center"}
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "5%",
          padding: 24,
          userSelect: "none",
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
              margin: "0 auto",
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
                initValues={[]}
              />
            </Form.Item>

            <Row
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 16,
                justifyContent: "space-around",
                padding: 24,
              }}
            >
              <Col xs={24} lg={12}>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  {t("Search")}
                </Button>
              </Col>
              <Col xs={24} lg={12}>
                {searchServices && (
                  <Button
                    size="large"
                    type="primary"
                    onClick={HandleViewOnMap}
                    style={{ width: "100%" }}
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
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          gap: 24,
          paddingInline: 24,
          userSelect: "none",
        }}
      >
        {!areThereUsers ? (
          <h3 style={{ color: "red" }}>
            {t("There are no providers that provide the requested service")}
          </h3>
        ) : (
          providers.map((provider: IProvider) => {
            return (
              <Col style={{ width: 250 }} key={provider.id}>
                {provider.role !== "customer" && (
                  <ProviderCard provider={provider} small={false} />
                )}
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};
