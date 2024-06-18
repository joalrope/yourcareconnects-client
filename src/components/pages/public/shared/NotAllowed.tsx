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
      style={{
        alignContent: "center",
        alignItems: "center",
        //backgroundColor: "white",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Col xs={16} sm={16} md={12} lg={12}>
        <Row
          style={{
            alignItems: "start",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Image
            src="/images/403.jpg"
            height={"auto"}
            width={"100%"}
            preview={false}
          />
        </Row>
      </Col>

      <Col xs={16} sm={16} md={8} lg={8}>
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
                fontSize: "clamp(1.5rem, 8vw-2rem, 3rem)",
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
            <Text
              style={{
                fontSize: "clamp(var(10px), var(12px), var(16px)) !important",
                textAlign: "left",
              }}
            >
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
