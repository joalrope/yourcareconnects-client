import { Card, Rate, Tooltip } from "antd";

const { Meta } = Card;

const baseUrl = import.meta.env.VITE_URL_BASE;

export interface IProvider {
  id: string;
  services: string[];
  lastName: string;
  names: string;
  ratings: number;
}

export const ProviderCard = ({
  id,
  lastName,
  names,
  services,
  ratings,
}: IProvider) => {
  const picture = `${baseUrl}/images/${id}/profile.png`;

  const serv = services.map((service) => {
    return service.split("|").pop();
  });

  const userServ = serv.join(", ");

  return (
    <Card
      hoverable
      style={{ height: "400px", width: "100%" }}
      cover={
        <img
          alt={`Picture of ${names} ${lastName}`}
          src={picture}
          height={240}
        />
      }
    >
      <Meta title={`${names} ${lastName}`} />
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
