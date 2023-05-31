import { Avatar, theme } from "antd";
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
    <div className="--layout__footer" style={{ color: token.colorPrimary }}>
      <div className="copyitem">Hecho con amor por Bohiques</div>
      <div className="copyitem">
        Copyright <CopyrightOutlined /> {new Date().getFullYear()} -
        Yourcareconnects
      </div>
      <div className="copyitem">
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
      </div>
    </div>
  );
};
