import { Col, Radio, RadioChangeEvent, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserGrid } from "./UserGrid";
import { useState } from "react";

const { Title } = Typography;

export enum TypeActiveUserStatus {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const DashboardAdmin = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState(TypeActiveUserStatus.ALL);

  const onUserTypeChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Row>
      <Row>
        <Col span={24} style={{ maxWidth: "96%", margin: "auto" }}>
          <Col span={24} style={{ borderBottom: "1px solid #e8e8e8" }}>
            <Title level={3} style={{ margin: "20px", width: "100%" }}>
              {t("Dashboard")}
            </Title>
          </Col>
        </Col>
        <Row
          style={{
            justifyContent: "flex-end",
            marginRight: 24,
            paddingTop: 48,
            width: "100%",
          }}
          gutter={[24, 24]}
        >
          <Col>
            <Radio.Group
              onChange={onUserTypeChange}
              value={value}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                marginLeft: 48,
                marginRight: 24,
              }}
            >
              <Radio value={TypeActiveUserStatus.ALL}>
                <Title level={5}>{t("All Users")}</Title>
              </Radio>
              <Radio value={TypeActiveUserStatus.INACTIVE}>
                <Title level={5}> {t("Inactive Users")}</Title>
              </Radio>
              <Radio value={TypeActiveUserStatus.ACTIVE}>
                <Title level={5}> {t("Active Providers")}</Title>
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginLeft: 48, marginRight: 24, width: "100%" }}>
          <UserGrid userType={value} />
        </Row>
      </Row>
      {/* <Row>Servicios</Row> */}
    </Row>
  );
};
