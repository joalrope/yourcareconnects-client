import { Avatar, Col, Row, theme } from "antd";
import {
  CopyrightOutlined,
  FacebookFilled,
  HeartFilled,
  InstagramFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import {
  ownerFacebookUrl,
  ownerTwitterUrl,
  ownerInstagramUrl,
} from "../app.config.json";

const { useToken } = theme;

export const FooterContent = () => {
  const { token } = useToken();

  return (
    <Row className="--layout__footer" style={{ color: token.colorPrimary }}>
      <Col xs={0} sm={0} md={0} lg={8} flex="1 0 auto">
        Made with <HeartFilled style={{ color: "red" }} /> by Bohiques
      </Col>
      <Col flex="1 0 auto">
        Copyright <CopyrightOutlined /> {new Date().getFullYear()} -
        Yourcareconnects
      </Col>
      <Col flex="1 0 auto">
        <Link
          className="--footer__avatar"
          to={ownerFacebookUrl}
          target="_blank"
        >
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <FacebookFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </Link>
        <Link className="--footer__avatar" to={ownerTwitterUrl} target="_blank">
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <TwitterCircleFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </Link>
        <Link
          className="--footer__avatar"
          to={ownerInstagramUrl}
          target="_blank"
        >
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <InstagramFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </Link>
      </Col>
    </Row>
  );
};
