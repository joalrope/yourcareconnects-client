import { Col, Row, Typography } from "antd";
import {
  IDataProvider,
  ProviderCard,
} from "../../../ui-components/provider-card/ProviderCard";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getInactiveUsers } from "../../../../services";

const { Title } = Typography;

export const UserGrid = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<IDataProvider[]>([]);

  const gutter = 32;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          result: { users },
        } = await getInactiveUsers();

        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return users.length > 0 ? (
    <Row
      gutter={[gutter, gutter]}
      style={{
        border: "1px solid #fbd467",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "center",
        padding: gutter,
        width: "100%",
      }}
    >
      <Title level={4}>{t("Provider Activation")}</Title>
      <Row
        gutter={[24, 24]}
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        {users.map((user: IDataProvider) => {
          return (
            <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
              <ProviderCard small={true} {...user} />
            </Col>
          );
        })}
      </Row>
    </Row>
  ) : (
    <></>
  );
};
