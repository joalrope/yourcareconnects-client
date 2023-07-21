import { Col } from "antd";
import { useTranslation } from "react-i18next";

interface IService {
  service: string;
  color: string;
}

export const ProviderSelectorCard = ({ service, color }: IService) => {
  const { t } = useTranslation();

  return (
    <Col
      xs={24}
      sm={12}
      md={6}
      lg={4}
      style={{
        alignItems: "center",
        backgroundColor: color,
        borderRadius: "8px",
        color: "#FFF",
        display: "flex",
        fontSize: "calc(0.51em + 1vw)",
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
