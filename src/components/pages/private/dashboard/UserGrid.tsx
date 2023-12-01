import { Col, Row, Typography } from "antd";
import {
  IDataProvider,
  ProviderCard,
} from "../../../ui-components/provider-card/ProviderCard";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export const UserGrid = () => {
  const { t } = useTranslation();

  const gutter = 32;

  const providers: IDataProvider[] = [
    {
      id: "1",
      fullname: "Provider 1",
      email: "jfjvjhffhf@smtp.email.com",
      services: [
        "service1",
        "service2",
        "service3",
        "service2",
        "service3",
        "service3",
        "service3",
      ],
      pictures: { profile: "https://joeschmoe.io/api/v1/random" },
    },
    {
      id: "2",
      fullname: "Provider 2",
      email: "erwfsdxdvx@smtp.email.com",
      services: ["service1", "service2", "service3"],
      pictures: { profile: "https://joeschmoe.io/api/v1/random" },
    },
    {
      id: "3",
      fullname: "Provider 3",
      email: "pmpkmon@smtp.email.com",
      services: ["service1", "service2", "service3"],
      pictures: { profile: "https://joeschmoe.io/api/v1/random" },
    },
    {
      id: "4",
      fullname: "Provider 4",
      email: "bnvfguyrt@smtp.email.com",
      services: ["service1", "service2", "service3"],
      pictures: { profile: "https://joeschmoe.io/api/v1/random" },
    },
  ];
  return (
    <Row
      gutter={[gutter, gutter]}
      style={{
        border: "1px solid #e8e8e8",
        borderRadius: "10px",
        flexDirection: "column",
        justifyContent: "center",
        margin: "auto",
        padding: gutter,
        width: "100%",
      }}
    >
      <Title level={4}>{t("Provider Activation")}</Title>
      <Row>
        {providers.map((provider: IDataProvider) => {
          return (
            <Col key={provider.id} xs={24} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <ProviderCard small={true} {...provider} />
            </Col>
          );
        })}
      </Row>
    </Row>
  );
};
