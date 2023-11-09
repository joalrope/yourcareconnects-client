import { Card, Rate, Tooltip } from "antd";

import { ILocation } from "../map/MapView";
import { UserTitle } from "./UserTitle";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const serv: string[] = [];

  services.map((service) => {
    serv.push(t(service.split("|").pop() as string));
  });

  const userServ = serv.join(", ");

  return (
    <Card
      hoverable
      style={{ height: "420px", width: "100%" }}
      cover={<img alt={`Picture of ${fullname}`} src={picture} height={240} />}
    >
      <Meta title={<UserTitle fullname={fullname} id={id} />} />
      <p style={{ marginTop: "8px" }}>
        <span>
          <b>{t("Services")}: </b>
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
