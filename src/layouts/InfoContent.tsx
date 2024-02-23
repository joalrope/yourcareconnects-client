import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Typography,
  theme,
} from "antd";
import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";

import { setLocationPath } from "../store/slices/router/routerSlice";
import {
  chatOffline,
  logout,
  setIsOpened,
  setLoggedIn,
  setUnreadCount,
} from "../store/slices";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";
import { RootState } from "../store";

import styles from "./layout.module.css";
import { useEffect } from "react";

const { Title } = Typography;
const { useToken } = theme;

//const baseUrl = import.meta.env.VITE_URL_BASE;

interface Props {
  names: string | undefined;
}

export const InfoContent = ({ names }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { token } = useToken();
  const { notifications, pictures } = useSelector(
    (state: RootState) => state.user
  );
  const { unreadCount } = useSelector((state: RootState) => state.chat);
  const { isOpened } = useSelector((state: RootState) => state.ui);
  //const [open, setOpen] = useState<boolean>(false);
  //const [notification, setNotification] = useState<number>(1);

  useEffect(() => {
    let count = 0;

    if (notifications) {
      Object.entries(notifications).map((key) => {
        count += key[1];
      });

      dispatch(setUnreadCount(count));
    } else {
      dispatch(setUnreadCount(0));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = () => {
    sessionStorage.clear();
    dispatch(logout());
    dispatch(chatOffline());
    dispatch(setLoggedIn(false));
    dispatch(setLocationPath("/"));
  };

  const handleNameClick = () => {
    dispatch(setIsOpened(false));
    //setOpen(false);
    dispatch(setLocationPath("dashboard"));
  };

  const handleNotificationsClick = () => {
    dispatch(setIsOpened(false));
  };

  const pictureUrl =
    pictures?.profile.image === ""
      ? "/images/user.png"
      : `${pictures?.profile.image}`;

  const handleOpenChange = (flag: boolean) => {
    dispatch(setIsOpened(flag));
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/dashboard" onClick={handleNameClick}>
            {names && (
              <Title
                style={{
                  cursor: "pointer",
                  color: token.colorTextBase,
                  paddingTop: "8px",
                  userSelect: "none",
                }}
                level={5}
              >
                {names}
              </Title>
            )}
          </Link>
          <Col>
            <Avatar
              shape="circle"
              src={pictureUrl}
              onClick={() => handleOpenChange(false)}
              size={44}
              style={{
                backgroundColor:
                  pictures?.profile.image === "" ? "white" : "transparent",
                cursor: "pointer",
                marginLeft: "12px",
              }}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/chat" onClick={handleNotificationsClick}>
            <Badge size="small" count={unreadCount}>
              <Avatar
                shape="circle"
                src="/images/bell-icon.png"
                style={{ cursor: "pointer", marginLeft: "12px" }}
              />
            </Badge>
          </Link>
        </Row>
      ),
    },
    {
      key: "3",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LanguageSelect />,
        </Row>
      ),
    },
    {
      key: "4",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            onClick={handleLogOut}
            style={{
              margin: 20,
              userSelect: "none",
              color: token.colorTextBase,
            }}
          >
            <LogoutOutlined /> {t("Log Out")}
          </Link>
        </Row>
      ),
    },
  ];

  return (
    <Row>
      <Col xs={0} sm={24} md={24}>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Col>
            <LanguageSelect />
          </Col>
          <Col style={{ margin: 12 }}>
            <Link to="/chat" onClick={handleNotificationsClick}>
              <Badge size="small" count={unreadCount}>
                <Avatar
                  shape="circle"
                  src="/images/bell-icon.png"
                  style={{ cursor: "pointer", marginLeft: "12px" }}
                />
              </Badge>
            </Link>
          </Col>
          <Col>
            <Link to="/dashboard" onClick={handleNameClick}>
              {names && (
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
              )}
            </Link>
          </Col>
          <Col>
            <Avatar
              shape="circle"
              src={pictureUrl}
              size={44}
              style={{
                backgroundColor:
                  pictures?.profile.image === "" ? "white" : "transparent",
                cursor: "pointer",
                marginLeft: "12px",
              }}
            />
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
        </Row>
      </Col>

      <Col xs={24} sm={0} md={0}>
        <Row className={styles.wrapperRow}>
          <Dropdown
            menu={{ items }}
            onOpenChange={handleOpenChange}
            open={isOpened}
          >
            <MenuOutlined style={{ color: "white", fontSize: "32px" }} />
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
};
