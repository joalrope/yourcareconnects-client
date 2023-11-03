import { Col, Image, Row, Typography } from "antd";
import { IMarker } from "./MapView";

const { Text } = Typography;

interface Props {
  selectedMarker: IMarker | null;
  marker: IMarker;
  handleMarkerClick: (marker: IMarker) => void;
}

export const LongInfo = ({
  marker,
  selectedMarker,
  handleMarkerClick,
}: Props) => {
  return (
    <Row
      gutter={12}
      style={{
        display: "flex",
        flexDirection: selectedMarker?.key === marker.key ? "column" : "row",
        justifyContent: selectedMarker?.key === marker.key ? "start" : "center",
        cursor: "pointer",
        userSelect: "none",

        height: selectedMarker?.key === marker.key ? 300 : "auto",
        width: selectedMarker?.key === marker.key ? 200 : "auto",
      }}
      onClick={() => handleMarkerClick(marker)}
    >
      <Col
        style={{
          marginLeft: selectedMarker?.key === marker.key ? 0 : 6,
          //paddingLeft: 7,
        }}
      >
        <Image
          src={marker.picture}
          width={selectedMarker?.key === marker.key ? 180 : 24}
          preview={false}
        />
      </Col>
      <Col>
        <Text
          strong
          style={{
            paddingRight: 16,
            userSelect: "none",
          }}
        >
          {marker.title}
        </Text>
      </Col>
    </Row>
  );
};
