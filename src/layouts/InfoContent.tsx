import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Badge, Col, Row, Typography, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { setLocationPath } from "../store/slices/router/routerSlice";
import { logout } from "../store/slices";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";

const { Title } = Typography;
const { useToken } = theme;

interface Props {
  names: string;
}

export const InfoContent = ({ names }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = useToken();

  const handleLogOut = (e: unknown) => {
    console.log(e);
    dispatch(setLocationPath("/"));
    dispatch(logout());
    sessionStorage.clear();
  };

  const handleNameClick = () => {
    console.log("dashboard");
    setLocationPath("dashboard");
  };

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      <Col>
        <Link to="/dashboard" onClick={handleNameClick}>
          <Title
            style={{
              cursor: "pointer",
              color: token.colorPrimary,
              paddingTop: "8px",
              userSelect: "none",
            }}
            level={5}
          >
            {names}
          </Title>
        </Link>
      </Col>
      <Col>
        <Avatar
          shape="circle"
          src="/images/man.png"
          style={{ cursor: "pointer", marginLeft: "12px" }}
        />
      </Col>
      <Col>
        <Badge count={1}>
          <Avatar
            shape="circle"
            src="/images/bell-icon.png"
            style={{ cursor: "pointer", marginLeft: "12px" }}
          />
        </Badge>
      </Col>
      <Col>
        <Link
          to="/"
          onClick={handleLogOut}
          style={{
            marginLeft: "10px",
            userSelect: "none",
            color: token.colorPrimary,
          }}
        >
          <LogoutOutlined /> {t("Log Out")}
        </Link>
      </Col>
      <Col>
        <LanguageSelect />
      </Col>
    </Row>
  );
};
