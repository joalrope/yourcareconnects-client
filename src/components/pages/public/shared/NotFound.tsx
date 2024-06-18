import { Button, Col, Image, Row, theme } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

export const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useToken();

  return (
    <Row
      gutter={16}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: "center" }}>
        <Image src="/images/404.jpg" width={"50vw"} preview={false} />
      </Col>

      <Col xs={24} sm={24} md={12} lg={12} style={{ padding: 24 }}>
        <Row style={{ alignItems: "center", flexDirection: "column" }}>
          <Col>
            <Title level={3} style={{ textAlign: "left", color: "red" }}>
              {t("404 Error")}
            </Title>
          </Col>
          <Col>
            <Title level={2} style={{ textAlign: "center" }}>
              {t("Sorry, page not found")}
            </Title>
          </Col>
          <Col>
            <Title level={4} style={{ textAlign: "center" }}>
              {t("Lost, Find your way by going back or asking for help")}
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => navigate(-1)}
              style={{
                border: `1px solid ${token.colorPrimary}!important`,
                fontWeight: 700,
                marginTop: "5vh",
                width: "100%",
              }}
            >
              {t("Return")}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
