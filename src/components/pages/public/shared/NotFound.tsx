import { Button, Col, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Row
      align={"middle"}
      gutter={48}
      justify={"center"}
      style={{
        position: "relative",
        backgroundColor: "white",
        height: "100%",
        top: -20,
      }}
    >
      <Col>
        <Image src="/images/404.jpg" width={"30vw"} preview={false} />
      </Col>

      <Col>
        <Row style={{ alignItems: "start", flexDirection: "column" }}>
          <Col>
            <Title level={3} style={{ textAlign: "left", color: "red" }}>
              {t("404 Error")}
            </Title>
          </Col>
          <Col>
            <Title level={2} style={{ textAlign: "left" }}>
              {t("Sorry, page not found")}
            </Title>
          </Col>
          <Col>
            <Title level={4} style={{ textAlign: "left" }}>
              {t("Lost, Find your way by going back or asking for help")}
            </Title>
          </Col>
          <Col>
            <Button style={{ marginTop: "5vh", width: "25vw" }}>
              {t("Return")}
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
