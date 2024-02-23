import { /* Button, */ Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import ImageYCC from "../../../ui-components/ImageYCC";

const { Paragraph, Title } = Typography;

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Row
      align={"middle"}
      justify={"center"}
      style={{ height: "100%", width: "90%", margin: "0 auto", padding: 24 }}
    >
      <Col span={12}>
        <Title
          style={{
            marginBottom: 0,
            marginTop: "2%",
            textAlign: "center",
            userSelect: "none",
            fontSize: 38,
          }}
          level={3}
        >
          {t("Welcome to Yourcareconnects")}
        </Title>
        <Paragraph
          style={{
            marginBottom: 0,
            textAlign: "center",
            userSelect: "none",
            fontSize: 26,
          }}
        >
          {t("Connecting Customers and Providers")}
        </Paragraph>

        <Row
          style={{ justifyContent: "center", marginTop: "7%", width: "100%" }}
        >
          {/*  <Link to="/login">
            <Button type="primary" style={{ width: 150 }}>
              {t("Login")}
            </Button>
          </Link> */}
        </Row>
      </Col>
      <Col span={12}>
        <ImageYCC width="60%" margin="0 auto" />
      </Col>
    </Row>
  );
};
