import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserGrid } from "./UserGrid";

const { Title } = Typography;

export const DashboardAdmin = () => {
  const { t } = useTranslation();

  return (
    <Row style={{ width: "100%" }}>
      <Col span={24} style={{ maxWidth: "96%", margin: "auto" }}>
        <Col span={24} style={{ borderBottom: "1px solid #e8e8e8" }}>
          <Title level={3} style={{ margin: "20px", width: "100%" }}>
            {t("Dashboard")}
          </Title>
        </Col>
      </Col>
      <UserGrid />
    </Row>
  );
};
