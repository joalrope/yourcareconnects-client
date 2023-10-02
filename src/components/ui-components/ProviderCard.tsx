import { Card, Rate } from "antd";

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
      style={{ height: 400, width: "100%" }}
      cover={
        <img
          alt={`Picture of ${names} ${lastName}`}
          src={picture}
          height={240}
        />
      }
    >
      <Meta title={`${names} ${lastName}`} />
      <p>
        <span>
          <b>{"Servicios: "}</b>
          {userServ}
        </span>
      </p>
      <Rate disabled allowHalf defaultValue={ratings} />
    </Card>
  );
};
