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
      // xs={24}
      // sm={12}
      // md={12}
      // lg={16}
      // xl={8}
      // xxl={4}
      style={{
        alignItems: "center",
        backgroundColor: color,
        borderRadius: "8px",
        color: "#FFF",
        display: "flex",
        fontSize: "12px",
        fontWeight: "bold",
        height: "14vh",
        justifyContent: "center",
        margin: "5px",
        padding: "12px",
        textAlign: "center",
        width: "10vw",
      }}
    >
      <span>{t(service)}</span>
    </Col>
  );
};
