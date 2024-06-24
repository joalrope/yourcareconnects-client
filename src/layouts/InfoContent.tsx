import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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
import {
  AppstoreOutlined,
  FormOutlined,
  HeartOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { setLocationPath } from "../store/slices/router/routerSlice";
import {
  chatOffline,
  logout,
  setIsOpened,
  setLoggedIn,
  setUnreadCount,
} from "../store/slices";
import { LanguageSelect } from "../components/ui-components/LanguageSelect";
import { RootState } from "../store";

import styles from "./layout.module.css";

const { Title } = Typography;
const { useToken } = theme;

interface Props {
  names: string | undefined;
}

export const InfoContent = ({ names }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useToken();
  const { notifications, pictures } = useSelector(
    (state: RootState) => state.user
  );
  const { unreadCount } = useSelector((state: RootState) => state.chat);
  const { isOpened } = useSelector((state: RootState) => state.ui);

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
    dispatch(setIsOpened(!isOpened));
    //setOpen(false);
    dispatch(setLocationPath("profile"));
    navigate("/profile");
  };

  const handleNotificationsClick = () => {
    dispatch(setIsOpened(!isOpened));
  };

  const handleItemClick = () => {
    dispatch(setIsOpened(!isOpened));
  };

  const pictureUrl =
    pictures?.profile.image === ""
      ? "/images/user.png"
      : `${pictures?.profile.image}`;

  const handleOpenChange = () => {
    dispatch(setIsOpened(!isOpened));
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
          <Link to="/profile">
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
          <Link to="/profile">
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
          </Link>
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
            to="/donations"
            style={{
              marginInline: 20,
              userSelect: "none",
              color: token.colorTextBase,
            }}
            onClick={handleItemClick}
          >
            <HeartOutlined /> {t("donations")}
          </Link>
        </Row>
      ),
    },
    {
      key: "5",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to="/blog"
            style={{
              marginInline: 20,
              userSelect: "none",
              color: token.colorTextBase,
            }}
            onClick={handleItemClick}
          >
            <FormOutlined /> {t("blog")}
          </Link>
        </Row>
      ),
    },
    {
      key: "6",
      label: (
        <Row
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            to="/shop"
            style={{
              marginInline: 20,
              userSelect: "none",
              color: token.colorTextBase,
            }}
            onClick={handleItemClick}
          >
            <AppstoreOutlined /> {t("shop")}
          </Link>
        </Row>
      ),
    },
    {
      key: "7",
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
      <Col xs={0} lg={24}>
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
          <Col>
            <Link
              to="/donations"
              style={{
                marginLeft: 22,
                userSelect: "none",
                color: token.colorPrimary,
              }}
            >
              <HeartOutlined /> {t("donations")}
            </Link>
          </Col>

          <Col>
            <Link
              to="/blog"
              style={{
                marginLeft: 22,
                userSelect: "none",
                color: token.colorPrimary,
              }}
            >
              <FormOutlined /> {t("blog")}
            </Link>
          </Col>

          <Col>
            <Link
              to="/shop"
              style={{
                marginLeft: 22,
                userSelect: "none",
                color: token.colorPrimary,
              }}
            >
              <AppstoreOutlined /> {t("shop")}
            </Link>
          </Col>
          <Col style={{ marginLeft: 22 }}>
            <Link to="/chat" onClick={handleNotificationsClick}>
              <Badge size="small" count={unreadCount}>
                <Avatar
                  shape="circle"
                  src="/images/bell-icon.png"
                  style={{ cursor: "pointer" }}
                />
              </Badge>
            </Link>
          </Col>
          <Col style={{ marginLeft: 18 }}>
            <Link to="/profile" onClick={handleNameClick}>
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

          <Link to="/profile" onClick={handleNameClick}>
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
          </Link>

          <Col>
            <Link
              to="/"
              onClick={handleLogOut}
              style={{
                marginLeft: 22,

                userSelect: "none",
                color: token.colorPrimary,
              }}
            >
              <LogoutOutlined /> {t("Log Out")}
            </Link>
          </Col>
        </Row>
      </Col>

      <Col xs={24} lg={0}>
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
