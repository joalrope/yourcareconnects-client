import { Col } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  service: string;
  color: string;
}

export const ProviderSelectorCard = ({ service, color }: Props) => {
  const { t } = useTranslation();

  return (
    <Col
      xs={24}
      sm={12}
      md={6}
      lg={4}
      style={{
        alignItems: "center",
        backgroundColor: `${color}20`,
        border: `1px solid ${color}`,
        borderRadius: "8px",
        color: `${color}`,
        display: "flex",
        fontSize: "clamp(1.2rem, 4cqi, 1.2rem)",
        fontWeight: "bold",
        height: "14vh",
        justifyContent: "center",
        margin: "5px",
        padding: "12px",
        textAlign: "center",
        width: "100%",
        maxWidth: "140px",
      }}
    >
      <span>{t(service)}</span>
    </Col>
  );
};
