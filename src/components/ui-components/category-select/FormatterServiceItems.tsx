import { Col, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { IItem } from "./interfaces";

export const formatterServiceItems = (
  services: IItem[],
  handleClick: (value: string | React.ReactNode) => void
) => {
  services.map((item) => {
    //console.log({ item });
    const bgc = `${item.tagColor}20`;
    const frc = `${item.tagColor}`;

    item.title = (
      <Row>
        {item.checkable === false ? (
          <Col
            xs={24}
            style={{
              backgroundColor: "#fbd467",
              border: `1px solid black`,
              borderRadius: 4,
              color: "black",
              fontSize: 12,
              paddingInline: 12,
            }}
            onClick={() => {
              handleClick(item.value);
            }}
          >
            <PlusCircleOutlined
              style={{
                marginRight: 12,
              }}
            />
            <b>{item.title}</b>
          </Col>
        ) : (
          <Col
            xs={24}
            style={{
              backgroundColor: bgc,
              border: `1px solid ${frc}`,
              color: frc,
              borderRadius: 4,
              paddingInline: 12,
            }}
          >
            {item.title}{" "}
          </Col>
        )}
      </Row>
    );
    if (item.children && item.children.length > 0) {
      formatterServiceItems(item.children, handleClick);
    }
  });
};
