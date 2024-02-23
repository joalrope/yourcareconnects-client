import { Image, Row, theme } from "antd";

const { useToken } = theme;

const ImageYCC = ({
  width,
  margin,
}: {
  width: string | number;
  margin?: string;
}) => {
  const { token } = useToken();

  return (
    <Row
      style={{
        display: "flex",
        justifyContent: "flex-end",
        minWidth: 200,
        userSelect: "none",
        width: `${width}`,
        margin: margin,
        paddingBottom: 24,
      }}
    >
      <Image preview={false} width={"100%"} src="/images/register-bg.png" />
      <div
        style={{
          width: "100%",
          height: 16,
          position: "relative",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "8px",
            backgroundColor: token.colorPrimary,
            position: "absolute",
            top: 0,
            left: "30px",
          }}
        />
        <div
          style={{
            width: "90%",
            height: "8px",
            backgroundColor: token.colorWhite,
            position: "absolute",
            top: "8px",
          }}
        />
      </div>
    </Row>
  );
};

export default ImageYCC;
