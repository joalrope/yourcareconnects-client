import { Card, Rate, Tooltip } from "antd";
import { ILocation } from "./map/MapView";

const { Meta } = Card;

const baseUrl = import.meta.env.VITE_URL_BASE;

export interface IDataProvider {
  id: string;
  services: string[];
  fullname?: string;
  location?: ILocation;
  pictures: { profile: string };
  ratings: number;
}

export const ProviderCard = ({
  id,
  fullname,
  services,
  pictures,
  ratings,
}: IDataProvider) => {
  const { profile } = pictures;
  const picture = `${baseUrl}/images/${id}/${profile}`;
  const serv = services.map((service) => {
    return service.split("|").pop();
  });

  const userServ = serv.join(", ");

  return (
    <Card
      hoverable
      style={{ height: "400px", width: "100%" }}
      cover={<img alt={`Picture of ${fullname}`} src={picture} height={240} />}
    >
      <Meta title={`${fullname}`} />
      <p style={{ marginTop: "8px" }}>
        <span>
          <b>{"Servicios: "}</b>
          <Tooltip placement="top" title={userServ}>
            <span
              style={{
                display: "-webkit-box",
                height: "38px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {userServ}
            </span>
          </Tooltip>
        </span>
      </p>

      <Rate disabled allowHalf defaultValue={ratings} />
    </Card>
  );
};
