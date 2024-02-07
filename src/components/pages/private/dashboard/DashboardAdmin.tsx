import { Col, Input, Radio, RadioChangeEvent, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserGrid } from "./UserGrid";
import { useState } from "react";

const { Title } = Typography;
const { Search } = Input;

export enum TypeActiveUserStatus {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
  UNIQUE = "unique",
}

export const DashboardAdmin = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [typeActiveUser, setTypeActiveUser] = useState(
    TypeActiveUserStatus.ALL
  );

  const onUserTypeChange = (e: RadioChangeEvent) => {
    setTypeActiveUser(e.target.value);
  };

  const onUserSearch = (value: string) => {
    setTypeActiveUser(TypeActiveUserStatus.UNIQUE);
    setEmail(value);
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
            marginLeft: 48,
            marginRight: 24,
            marginTop: 10,
            marginBottom: 10,
            width: "100%",
          }}
          gutter={[24, 24]}
        >
          <Col>
            <Radio.Group
              onChange={onUserTypeChange}
              value={typeActiveUser}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                flexWrap: "wrap",
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
              <Search
                onSearch={onUserSearch}
                allowClear={true}
                placeholder="Search by email"
                style={{ width: 200 }}
                enterButton
              />
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginLeft: 48, marginRight: 24, width: "100%" }}>
          <UserGrid userType={typeActiveUser} email={email} />
        </Row>
      </Row>
      {/* <Row>Servicios</Row> */}
    </Row>
  );
};
