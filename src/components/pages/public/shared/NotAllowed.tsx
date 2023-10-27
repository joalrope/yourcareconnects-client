import { Button, Col, Image, Row, Typography, theme } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const { useToken } = theme;

export const NotAllowed = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useToken();

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
        <Image src="/images/403.jpg" width={"30vw"} preview={false} />
      </Col>

      <Col>
        <Row
          style={{
            alignItems: "start",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Col style={{ width: "100%" }}>
            <Text
              style={{
                backgroundColor: "#2c444e",
                border: "1px solid black",
                borderRadius: "12px",
                color: "white",
                display: "block",
                fontSize: "2vw",
                paddingBottom: "0.75vh",
                paddingInline: "2vw",
                textAlign: "center",
                width: "100%",
              }}
            >
              {t("Access denied")}
            </Text>
          </Col>
          <Col>
            <Text style={{ fontSize: "1.2vw", textAlign: "left" }}>
              {t("Looks like you don't have access to this page")}
            </Text>
          </Col>
          <Col style={{ width: "100%" }}>
            <Button
              type="primary"
              onClick={() => navigate("/")}
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
