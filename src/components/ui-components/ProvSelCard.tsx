import { Col } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  service: string | React.ReactNode;
  tagColor: string;
}

export const ProviderSelectorCard = ({ service, tagColor }: Props) => {
  const { t } = useTranslation();

  return (
    <Col
      xs={24}
      sm={12}
      md={6}
      lg={4}
      style={{
        alignItems: "center",
        backgroundColor: `${tagColor}20`,
        border: `1px solid ${tagColor}`,
        borderRadius: "8px",
        color: `${tagColor}`,
        display: "flex",
        fontSize: "clamp(1.5rem, 8vw-2rem, 3rem)",
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
      <span>{t(service as string)}</span>
    </Col>
  );
};
