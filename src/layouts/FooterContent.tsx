import { Avatar, Col, Row, theme } from "antd";
import {
  InstagramFilled,
  TwitterCircleFilled,
  FacebookFilled,
  CopyrightOutlined,
} from "@ant-design/icons";

const { useToken } = theme;

export const FooterContent = () => {
  const { token } = useToken();

  return (
    <Row className="--layout__footer" style={{ color: token.colorPrimary }}>
      <Col className="copyitem" xs={0} sm={0} md={0} lg={5}>
        Hecho con ♥ por Bohiques
      </Col>
      <Col className="copyitem">
        Copyright <CopyrightOutlined /> {new Date().getFullYear()} -
        Yourcareconnects
      </Col>
      <Col className="copyitem">
        <a
          className="--footer__avatar"
          href="https://ant.design"
          target="_blank"
        >
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <FacebookFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </a>
        <a className="--footer__avatar" href="https://ant.design">
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <TwitterCircleFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </a>
        <a className="--footer__avatar" href="https://ant.design">
          <Avatar style={{ backgroundColor: token.colorPrimary }}>
            <InstagramFilled style={{ color: "#1a1a13" }} />
          </Avatar>
        </a>
      </Col>
    </Row>
  );
};
