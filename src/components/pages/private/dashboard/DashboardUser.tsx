import { Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//const { useToken } = theme;
export const DashboardUser = () => {
  const { names, role } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <Row>
      <Col
        style={{
          paddingInline: 24,
          paddingTop: 72,
          width: "100%",
        }}
      >
        <Title level={3} style={{ padding: 48 }}>
          {t("Welcome")}, {names}
        </Title>
        <Row
          style={{
            flexDirection: "column",
            gap: 12,
            padding: 48,
          }}
        >
          <Col>
            {t(
              `Here is your gateway to a wide range of high-quality medical and home services`
            )}
          </Col>

          <Col>{t(`To get the maximum potential of the platform`)}</Col>

          {role === "provider" && (
            <Col>
              {t(
                `Dear provider, it is important that you indicate your geolocation`
              )}
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};
