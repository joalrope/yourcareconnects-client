import { Card, Col, Row, theme } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { ProviderSelectorCard } from "../../../ui-components/ProvSelCard";
import { useLocale } from "../../../../hooks/useLocale";

const { useToken } = theme;
const Dashboard = () => {
  const { names, balance, points } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();
  const { token } = useToken();

  const gutter = 32;

  const providerCard = [
    { service: "Clinical Services", color: "#FCCA3E" },
    { service: "Holistic & Palliative Services", color: "#4762EE" },
    { service: "Domestic Services", color: "#31E59A" },
    { service: "Legal & Translation Services", color: "#F35050" },
    { service: "Pet Care Services", color: "#DD50F3" },
    { service: "Meal Prep & Nutritional Services", color: "#47BCEE" },
  ];

  return (
    <Col span={24} style={{ maxWidth: "96%", margin: "auto" }}>
      <Col span={24} style={{ borderBottom: "1px solid #e8e8e8" }}>
        <Title level={3} style={{ margin: "20px", width: "100%" }}>
          {t("Dashboard")}
        </Title>
      </Col>
      <Row
        gutter={[gutter, gutter]}
        justify="space-around"
        style={{ padding: gutter }}
      >
        <Col xs={24} xl={12}>
          <Card title={`${t("Welcome")}, ${names}`}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              dolorem, illo mollitia quae dicta odio iste vel nam. Aliquid
              voluptatem magni praesentium natus dicta quam perferendis placeat
              voluptatum velit qui.
            </p>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Balance" style={{ height: "100%" }}>
            <Title level={4} style={{ marginBottom: 0, textAlign: "center" }}>
              {useLocale(balance)}
            </Title>
            <Title
              level={5}
              style={{
                marginTop: 0,
                textAlign: "center",
                color: token.colorPrimary,
                WebkitTextStrokeColor: token.colorWhite,
                WebkitTextStrokeWidth: "1px",
              }}
            >
              {`${points} ${t("Points")}`}
            </Title>
          </Card>
        </Col>
      </Row>
      <Row justify="space-around" style={{ paddingInline: gutter }}>
        <Card title={t("Favorite Services")} style={{ width: "100%" }}>
          <Row justify="space-around" style={{ width: "100%" }}>
            {providerCard.map((item) => (
              <ProviderSelectorCard
                key={item.service}
                service={item.service}
                color={item.color}
              />
            ))}
          </Row>
        </Card>
      </Row>
    </Col>
  );
};

export default Dashboard;
