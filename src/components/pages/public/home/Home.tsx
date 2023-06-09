import { Button, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ImageYCC from "../../../ui-components/ImageYCC";

const { Paragraph, Title } = Typography;

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageYCC width="50%" />
        <Title
          style={{
            marginBottom: 0,
            marginTop: "2%",
            textAlign: "center",
            userSelect: "none",
          }}
          level={3}
        >
          {t("Welcome to yourcareconnects")}
        </Title>
        <Paragraph
          style={{ marginBottom: 0, textAlign: "center", userSelect: "none" }}
        >
          {t("Connecting Customers and Providers")}
        </Paragraph>

        <Row
          style={{ justifyContent: "center", marginTop: "7%", width: "100%" }}
        >
          <Link to="/login">
            <Button type="primary" style={{ width: 150 }}>
              {t("Login")}
            </Button>
          </Link>
        </Row>
      </Col>
    </Row>
  );
};
