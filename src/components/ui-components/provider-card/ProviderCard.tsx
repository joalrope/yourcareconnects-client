import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Rate,
  Row,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../store";
import { IProvider } from "../../../interface/provider";
import { UserTitle } from "./UserTitle";
import { useState } from "react";
import { updateUserRatings } from "../../../services";
import { updateProviderRatings } from "../../../store/slices";
import { useNavigate } from "react-router-dom";

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
  const {
    id,
    fullname,
    email,
    phoneNumber,
    ratings,
    services,
    role,
    isAllowedViewData,
    isActive,
    isDeleted,
  } = provider;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { locationPath } = useSelector((state: RootState) => state.router);
  const [rate, setRate] = useState(ratings?.value);

  const profile = provider.pictures?.profile;

  const picture = profile?.image || "/images/user.png";
  const { t } = useTranslation();

  const serv: string[] = [];

  services?.map((service) => {
    serv.push(t(service.split("|").pop() as string));
  });

  const userServ = serv.join(", ");

  const onRate = async (value: number) => {
    setRate(value);
    const newRate = value + ratings.value / (ratings.count + 1);
    const newRatings = {
      value: newRate,
      count: ratings.count + 1,
    };

    const { ok, msg, result } = await updateUserRatings(id, newRatings);

    if (ok) {
      setRate(newRate);

      dispatch(updateProviderRatings({ id, ratings: result.ratings }));

      message.success(msg);
    }
  };

  const handleClickViewProfile = () => {
    navigate(`/provider-profile/${id}`);
  };

  return (
    <Card
      hoverable
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: 450,
        height: small ? 350 : 450,
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
                picture={picture}
                fullname={fullname}
                email={email}
                phoneNumber={phoneNumber}
                id={String(id)}
                contact={small}
                isActive={isActive}
                isDeleted={isDeleted}
                isAllowedViewData={isAllowedViewData}
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
              ellipsis={true}
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
        <Col
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button onClick={handleClickViewProfile} size="small" type="primary">
            {t("more...")}
          </Button>
        </Col>
        <Rate
          disabled={locationPath !== "services"}
          allowHalf
          defaultValue={rate}
          style={{ fontSize: 16 }}
          onChange={onRate}
        />
      </Row>
    </Card>
  );
};
