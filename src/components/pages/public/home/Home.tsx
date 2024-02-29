import { /* Button, */ Avatar, Col, Row, Typography, theme } from "antd";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import ImageYCC from "../../../ui-components/ImageYCC";
import { Link } from "react-router-dom";
import {
  ownerFacebookUrl,
  ownerTwitterUrl,
  ownerInstagramUrl,
} from "../../../../app.config.json";
import {
  FacebookFilled,
  InstagramFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";

const { useToken } = theme;

const { Paragraph, Title } = Typography;

export const Home = () => {
  const { t } = useTranslation();
  const { token } = useToken();

  return (
    <Row
      align={"middle"}
      justify={"center"}
      style={{
        height: "100%",
        width: "100%",
        margin: "0 auto",
        padding: "24px 5%",
        background: "#f1f1f1",
      }}
    >
      <Col span={12}>
        <Title
          style={{
            marginBottom: 0,

            textAlign: "center",
            userSelect: "none",
            fontSize: 48,
          }}
          level={3}
        >
          {t("Welcome to ")}
          <span style={{ color: "rgb(238 191 57)" }}>Yourcareconnects</span>
        </Title>
        <Paragraph
          style={{
            marginBottom: 0,
            textAlign: "center",
            userSelect: "none",
            fontSize: 30,
          }}
        >
          {t("Connecting Customers and Providers")}
        </Paragraph>
        <Col flex="1 0 auto" style={{ textAlign: "center", marginTop: 12 }}>
          <Link
            style={{ marginRight: 12 }}
            className="--footer__avatar"
            to={ownerFacebookUrl}
            target="_blank"
          >
            <Avatar
              size={"large"}
              style={{
                fontSize: 20,
                backgroundColor: token.colorPrimary,
              }}
            >
              <FacebookFilled style={{ color: "#1a1a13" }} />
            </Avatar>
          </Link>
          <Link
            style={{ marginRight: 12 }}
            className="--footer__avatar"
            to={ownerTwitterUrl}
            target="_blank"
          >
            <Avatar
              size={"large"}
              style={{
                fontSize: 20,
                backgroundColor: token.colorPrimary,
              }}
            >
              <TwitterCircleFilled style={{ color: "#1a1a13" }} />
            </Avatar>
          </Link>
          <Link
            className="--footer__avatar"
            to={ownerInstagramUrl}
            target="_blank"
          >
            <Avatar
              size={"large"}
              style={{
                fontSize: 20,
                backgroundColor: token.colorPrimary,
              }}
            >
              <InstagramFilled style={{ color: "#1a1a13" }} />
            </Avatar>
          </Link>
        </Col>
        <Row style={{ justifyContent: "left", marginTop: 12, width: "100%" }}>
          {/*  <Link to="/login">
            <Button size="large" type="primary" style={{ width: 150 }}>
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
