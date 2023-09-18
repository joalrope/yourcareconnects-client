import { Card } from "antd";

const { Meta } = Card;

export interface IProvCardProps {
  id: string;
  address: string;
  picture: string;
  lastName: string;
  names: string;
  ratings: string;
}

export const ProviderCard = ({
  address,
  picture,
  lastName,
  names,
  ratings,
}: IProvCardProps) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={`Picture of ${names} ${lastName}`} src={picture} />}
    >
      <Meta title={`${names} ${lastName}`} description={address} />
      {ratings}
    </Card>
  );
};
