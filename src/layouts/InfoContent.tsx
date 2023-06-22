import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Badge, Row, Tooltip, Typography, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { logout, setES, setUS } from "../store/slices";
import { useTranslation } from "react-i18next";
import { RootState } from "../store";

const { Title } = Typography;
const { useToken } = theme;

interface Props {
  names: string;
}

export const InfoContent = ({ names }: Props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { token } = useToken();

  const handleLogOut = () => {
    dispatch(logout());
    sessionStorage.clear();
  };

  const handleNameClick = () => {
    window.history.replaceState(null, "", "/dashboard");
  };

  const setLng = () => {
    if (language === "enUS") {
      i18n.changeLanguage("es");
      dispatch(setES());
    }
    if (language === "esES") {
      i18n.changeLanguage("en");
      dispatch(setUS());
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
      }}
    >
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
      <Avatar
        shape="circle"
        src="/images/man.png"
        style={{ cursor: "pointer", marginLeft: "12px" }}
      />
      ,
      <Badge count={1}>
        <Avatar
          shape="circle"
          src="/images/bell-icon.png"
          style={{ cursor: "pointer", marginLeft: "12px" }}
        />
      </Badge>
      <Link
        to="/"
        onClick={handleLogOut}
        style={{
          marginLeft: "30px",
          userSelect: "none",
          color: token.colorPrimary,
        }}
      >
        <LogoutOutlined /> {t("Log Out")}
      </Link>
      <Tooltip
        placement="top"
        title={"English/Español"}
        className="--tooltip-title__language"
      >
        <Avatar
          onClick={setLng}
          size={24}
          src={
            language === "enUS" ? "/images/ES-flag.png" : "/images/US-flag.png"
          }
          style={{ cursor: "pointer", marginLeft: "30px" }}
        />
      </Tooltip>
    </Row>
  );
};
