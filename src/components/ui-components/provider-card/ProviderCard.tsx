import { Card, Col, Rate, Row, Tooltip, Typography } from "antd";

import { UserTitle } from "./UserTitle";
import { useTranslation } from "react-i18next";
import { IProvider } from "../../../interface/provider";

const { Meta } = Card;
const { Text, Title } = Typography;

/* export interface IDataProvider {
  id: string;
  services: string[];
  fullname?: string;
  email?: string;
  location?: ILocation;
  pictures: { profile: { name: string; image: string; type: string } };
  isActive?: boolean;
  ratings?: number;
  small?: boolean;
  role?: string;
} */

export const ProviderCard = ({
  provider,
  small,
}: {
  provider: IProvider;
  small: boolean;
}) => {
  const profile = !small
    ? provider.pictures?.profile
    : { name: "", image: "/images/user.png", type: "" };

  const {
    id,
    fullname,
    email,
    phoneNumber,
    services,
    ratings,
    role,
    isActive,
  } = provider;

  const picture = profile?.image || "/images/user.png";
  const { t } = useTranslation();

  const serv: string[] = [];

  services?.map((service) => {
    serv.push(t(service.split("|").pop() as string));
  });

  const userServ = serv.join(", ");

  return (
    <Card
      hoverable
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: 450,
        height: small ? 345 : 400,
        maxWidth: 230,
      }}
      cover={
        !small && (
          <img
            alt={`Picture of ${fullname}`}
            src={small ? "/images/logo.png" : picture}
            height={240}
          />
        )
      }
    >
      <Row
        style={{
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Col>
          <Meta
            title={
              <UserTitle
                fullname={fullname}
                email={email}
                phoneNumber={phoneNumber}
                id={String(id)}
                contact={small}
                isActive={isActive}
                small={small}
                role={role}
              />
            }
          />
        </Col>
        <Col style={{ display: "flex", flexDirection: "column" }}>
          <Title level={5} style={{ height: 12, marginTop: 5 }}>
            {t("Services")}:{" "}
          </Title>
          <Tooltip placement="top" title={userServ}>
            <Text
              style={{
                display: "-webkit-box",
                height: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              {userServ}
            </Text>
          </Tooltip>
        </Col>
        <Rate
          disabled
          allowHalf
          defaultValue={ratings}
          style={{ fontSize: 16 }}
        />
      </Row>
    </Card>
  );
};
