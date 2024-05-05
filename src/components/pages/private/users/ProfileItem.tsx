import { Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

interface Props {
  title: string;
  value: string;
}
export const ProfileItem = ({ title, value }: Props) => {
  const { t } = useTranslation();

  return (
    <Row style={{ flexDirection: "row", gap: 8, width: "100%" }}>
      <Title level={5} style={{ margin: 0 }}>
        {t(`${title}`)}:
      </Title>
      <p style={{ margin: 0 }}>{value}</p>
    </Row>
  );
};
