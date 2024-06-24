import { Col, Collapse, Image, Row } from "antd";
import Title from "antd/es/typography/Title";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  ForwardOutlined,
  MessageOutlined,
  ProfileOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import { RootState } from "../../../../store";

//const { useToken } = theme;
export const DashboardUser = () => {
  const { names, role } = useSelector((state: RootState) => state.user);
  const { t, i18n } = useTranslation();

  console.log({ lng: i18n.language });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items = [
    {
      label: (
        <Title
          level={role === "customer" ? 4 : 5}
          style={{ userSelect: "none" }}
        >
          {" "}
          <ProfileOutlined style={{ color: "#6b0505" }} />{" "}
          {t("Fill out your profile")}
        </Title>
      ),
      key: "1",
      children: (
        <Row>
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Col
              style={{
                textAlign: "center",
                fontSize: role === "customer" ? 16 : 14,
                width: "100vw",
              }}
            >
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(`In the left side menu, click on the profile option`)}
            </Col>
            <Col style={{ textAlign: "center", padding: 8, width: "100vw" }}>
              <Image
                preview={false}
                src="/images/profile-menu.png"
                height={180}
              />
            </Col>
            <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(`and complete all the information requested.`)}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image
                preview={false}
                src="/images/profile-form.png"
                height={180}
              />
            </Col>
          </Row>
          <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
            <WarningOutlined style={{ color: "red" }} />{" "}
            {t(
              `Dear {{user}}, it is important that you indicate your geolocation`,
              {
                user: (role === "customer"
                  ? t("customer")
                  : t("provider")
                ).toLowerCase(),
              }
            )}
            {role === "customer" ? (
              <span>
                {" "}
                {t(
                  "because this way we can show you the service providers closest to your residence"
                )}
              </span>
            ) : (
              <span>
                {" "}
                {t(
                  "because this way you will appear in the searches that customers do"
                )}
              </span>
            )}
          </Col>
        </Row>
      ),
    },
    {
      label: (
        <Title
          level={role === "customer" ? 4 : 5}
          style={{ userSelect: "none" }}
        >
          {" "}
          <SearchOutlined style={{ color: "#6b0505" }} />{" "}
          {t("Find who provides the service you need")}
        </Title>
      ),
      key: "2",
      children: (
        <Row>
          <Row style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Col
              style={{
                fontSize: role === "customer" ? 16 : 14,
                width: "100vw",
              }}
            >
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(`In the left side menu, click on the services option`)}
            </Col>
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 8,
              }}
            >
              <Image
                preview={false}
                src="/images/services-menu.png"
                height={180}
              />
            </Col>

            <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(`and in the box write or search for the service you need`)}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image
                preview={true}
                src="/images/search-page.png"
                height={180}
              />
            </Col>

            <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(`then click search`)}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image
                preview={true}
                src="/images/search-button.png"
                height={180}
              />
            </Col>
          </Row>
        </Row>
      ),
    },
    {
      label: (
        <Title
          level={role === "customer" ? 4 : 5}
          style={{ userSelect: "none" }}
        >
          {" "}
          <MessageOutlined style={{ color: "#6b0505" }} />{" "}
          {t("Contact and agree with the provider of your preference")}
        </Title>
      ),
      key: "3",
      children: (
        <Row>
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Col
              style={{
                fontSize: role === "customer" ? 16 : 14,
                width: "100vw",
              }}
            >
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(
                `The cards of the suppliers close to your home appear, in it you can see their data`
              )}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image preview={false} src="/images/user-card.png" height={180} />
            </Col>

            <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(
                `If you are interested in the service of any of the providers`
              )}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image
                preview={true}
                src="/images/arrow-contact-user-card.png"
                height={180}
              />
            </Col>

            <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
              <ForwardOutlined style={{ color: "green" }} />{" "}
              {t(
                `That will take you to the chat, and there you can communicate with the provider`
              )}
            </Col>
            <Col
              style={{ display: "flex", justifyContent: "center", padding: 8 }}
            >
              <Image preview={true} src="/images/chat.png" height={180} />
            </Col>
          </Row>
        </Row>
      ),
    },
  ];

  return (
    <Row style={{ paddingBottom: 96 }}>
      <Col
        style={{
          paddingInline: 24,
          paddingTop: 72,
          width: "100%",
        }}
      >
        <Title level={3} style={{ paddingBottom: 24, paddingInline: 48 }}>
          {t("Welcome")}, {names}
        </Title>
        <Row
          style={{
            flexDirection: "column",
            gap: 12,
            paddingInline: 48,
          }}
        >
          <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
            {t(
              `Here is your gateway to a wide range of high-quality medical and home services`
            )}
          </Col>

          <Col style={{ fontSize: role === "customer" ? 16 : 14 }}>
            {t(`To get the maximum potential of the platform`)}{" "}
            <b>({t(`Click on each one to receive instructions`)})</b>
          </Col>
        </Row>

        <Row
          style={{
            paddingTop: 24,
            paddingInline: 48,
          }}
        >
          <Col>
            <Collapse accordion items={items} onChange={onChange} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
