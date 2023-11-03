import { Col, Image, Row, Typography } from "antd";
import { IMarker } from "./MapView";

const { Text } = Typography;

interface Props {
  marker: IMarker;
  handleMarkerClick: (pointer: IMarker) => void;
}

export const ShortInfo = ({ marker, handleMarkerClick }: Props) => {
  return (
    <Row
      gutter={12}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
        height: "auto",
        width: "auto",
      }}
      onClick={() => handleMarkerClick(marker)}
    >
      <Col style={{ marginLeft: 6 }}>
        <Image src={marker.picture} width={24} preview={false} />
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
