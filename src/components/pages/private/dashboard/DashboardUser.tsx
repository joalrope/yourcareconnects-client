import { Card, Col, Row } from "antd";
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

//const { useToken } = theme;
export const DashboardUser = () => {
  const dispatch = useDispatch();
  const { names, balance, points, services } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();
  //const { token } = useToken();

  const [providerCard, setProviderCard] = useState<IRes[]>([]);

  const gutter = 18;

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
    <Row style={{ padding: 24, width: "100%" }}>
      <Col span={24} style={{ maxWidth: "96%", margin: "auto" }}>
        <Col span={24}>
          <Title level={3} style={{ margin: "20px 12px", width: "100%" }}>
            {t("Welcome")}, {names}
          </Title>
        </Col>
        <Row
          gutter={[gutter, gutter]}
          justify="start"
          style={{ padding: gutter }}
        >
          <Col xs={24} xl={8} style={{ paddingLeft: 0 }}>
            <div
              style={{
                background: "white",
                padding: 18,

                border: "1px solid #80808030",
                borderRadius: 8,
              }}
            >
              <Title level={4} style={{ marginBottom: 0, textAlign: "left" }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  {" "}
                  {useLocale(balance)}{" "}
                </span>{" "}
                <br />
                <span style={{ fontSize: 14 }}> Balance</span>
              </Title>
            </div>
          </Col>
          <Col xs={24} xl={8}>
            <div
              style={{
                background: "white",
                padding: 18,
                border: "1px solid #80808030",
                borderRadius: 8,
              }}
            >
              <Title level={4} style={{ marginBottom: 0, textAlign: "left" }}>
                <span style={{ fontSize: 20, fontWeight: 700 }}>
                  {" "}
                  {`${points} `}{" "}
                </span>{" "}
                <br />
                <span style={{ fontSize: 14 }}>{t("Points")}</span>
              </Title>
            </div>
          </Col>
        </Row>
        {providerCard && providerCard.length > 0 && (
          <Row justify="space-around" style={{ paddingInline: gutter }}>
            <Card title={t("Favorite Services")} style={{ width: "100%" }}>
              <Row justify="space-around" style={{ width: "100%" }}>
                {providerCard.map(
                  (item: { service: string; color: string }) => (
                    <ProviderSelectorCard
                      key={item.service}
                      service={item.service}
                      tagColor={item.color}
                    />
                  )
                )}
              </Row>
            </Card>
          </Row>
        )}
      </Col>
    </Row>
  );
};
