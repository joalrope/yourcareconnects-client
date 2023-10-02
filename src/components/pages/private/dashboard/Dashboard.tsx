import { Card, Col, Row, theme } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { ProviderSelectorCard } from "../../../ui-components/ProvSelCard";
import { useLocale } from "../../../../hooks/useLocale";
import { getServicesWithColor } from "../../../../services";
import { useEffect, useState } from "react";
import { IRes } from "../../../../services/serviceService";
import { setLoading } from "../../../../store/slices";

const { useToken } = theme;
const Dashboard = () => {
  const dispatch = useDispatch();
  const { names, balance, biography, points, services } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();
  const { token } = useToken();

  const [providerCard, setProviderCard] = useState<IRes[]>([]);

  const gutter = 32;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await getServicesWithColor(services);
        dispatch(setLoading(false));
        setProviderCard(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, services]);

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
            <p>{biography}</p>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="Balance" style={{ height: "100%" }}>
            <Title level={4} style={{ marginBottom: 0, textAlign: "center" }}>
              {useLocale(balance)}{" "}
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
      {providerCard.length > 0 && (
        <Row justify="space-around" style={{ paddingInline: gutter }}>
          <Card title={t("Favorite Services")} style={{ width: "100%" }}>
            <Row justify="space-around" style={{ width: "100%" }}>
              {providerCard.map((item: { service: string; color: string }) => (
                <ProviderSelectorCard
                  key={item.service}
                  service={item.service}
                  tagColor={item.color}
                />
              ))}
            </Row>
          </Card>
        </Row>
      )}
    </Col>
  );
};

export default Dashboard;
