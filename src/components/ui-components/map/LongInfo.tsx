import { Col, Image, Rate, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { IMarker } from "./MapView";
//import { useSelector } from "react-redux";
//import { RootState } from "../../../store";

const { Text } = Typography;

interface Props {
  selectedMarker: IMarker | null;
  marker: IMarker;
  handleMarkerClick: (marker: IMarker) => void;
}

const baseUrl = import.meta.env.VITE_URL_BASE;

export const LongInfo = ({
  marker,
  selectedMarker,
  handleMarkerClick,
}: Props) => {
  //const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  const isLong = selectedMarker?.id === marker.id;

  const services =
    marker.services &&
    marker.services
      .map((service) => {
        return service.split("|").pop();
      })
      .join(", ");

  return (
    <Row
      gutter={12}
      style={{
        display: "flex",
        flexDirection: isLong ? "column" : "row",
        justifyContent: isLong ? "space-evenly" : "center",
        cursor: "pointer",
        userSelect: "none",

        height: "auto",
        width: isLong ? 200 : "auto",
      }}
      onClick={() => handleMarkerClick(marker)}
    >
      <Col
        style={{
          marginLeft: isLong ? 0 : 6,
          //paddingLeft: 7,
        }}
      >
        <Image
          src={`${baseUrl}/images/${marker.id}/${marker.pictures?.profile}`}
          width={isLong ? 180 : 24}
          preview={false}
        />
      </Col>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        {isLong && (
          <Col
            style={{
              paddingLeft: 7,
              paddingRight: 16,
              marginBottom: 0,
              userSelect: "none",
            }}
          >
            <Text>{t("Name")}:</Text>
          </Col>
        )}
        <Col
          style={{
            paddingLeft: 7,
            paddingRight: 16,
            userSelect: "none",
          }}
        >
          <Text
            strong
            style={{
              paddingRight: 16,
              userSelect: "none",
            }}
          >
            {
              /* marker.fullname !== user.fullname ?  */ marker.fullname /* : t("Me") */
            }
          </Text>
        </Col>
      </Row>

      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {isLong && (
          <Col>
            <Row style={{ width: "100%" }}>
              <Col
                style={{
                  paddingLeft: 7,
                  paddingRight: 16,
                  userSelect: "none",
                }}
              >
                <Text>{t("Services")}:</Text>
              </Col>
              <Col
                style={{
                  display: "flex",
                  height: 48,
                  paddingLeft: 7,
                  paddingRight: 16,
                  userSelect: "none",
                }}
              >
                <Text strong>{services}</Text>
              </Col>
            </Row>
          </Col>
        )}

        {isLong && (
          <Col>
            <Rate disabled allowHalf defaultValue={marker.ratings} />
          </Col>
        )}
      </Row>
    </Row>
  );
};
