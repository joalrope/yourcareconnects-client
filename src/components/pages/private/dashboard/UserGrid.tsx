import { Col, Row, Typography } from "antd";
import { ProviderCard } from "../../../ui-components/provider-card/ProviderCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getUsersByIsActive } from "../../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setClearProviders, setProviders } from "../../../../store/slices";
import { RootState } from "../../../../store";
import { IProvider } from "../../../../interface/provider";
import { getUserByEmail } from "../../../../services/userService";

const { Title } = Typography;
const gutter = 16;

export const UserGrid = ({
  userType,
  email = "",
}: {
  userType: string;
  email?: string;
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const providers = useSelector((state: RootState) => state.providers);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;

      try {
        if (userType === "unique") {
          response = await getUserByEmail(email);
        } else {
          response = await getUsersByIsActive(userType);
        }
      } catch (error) {
        console.log(error);
      }

      const {
        result: { users },
      } = response;

      if (!users) {
        dispatch(setClearProviders());
        return null;
      }

      if (userType !== "unique") {
        const filteredUsers = users.filter(
          (user: IProvider) =>
            user.role !== "owner" &&
            user.role !== "developer" &&
            user.role !== "superadmin"
        );
        dispatch(setProviders(filteredUsers));
        return null;
      }

      dispatch(setProviders(users));
    };

    fetchData();
  }, [dispatch, email, userType]);

  return (
    <Row
      gutter={[gutter, gutter]}
      style={{
        border: "1px solid #fbd467",
        borderRadius: 10,
        padding: 24,
        flexDirection: "column",
        justifyContent: "center",

        width: "100%",
      }}
    >
      <Title style={{ display: "flex", justifyContent: "center" }} level={4}>
        {t("Customer and provider management")}
      </Title>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          gap: 24,
        }}
      >
        {providers?.length > 0 ? (
          providers.map((provider: IProvider) => {
            return (
              <Col style={{ width: "250px" }} key={provider.id}>
                <ProviderCard provider={provider} small={true} />
              </Col>
            );
          })
        ) : userType !== "unique" ? (
          <Title level={4}>
            {t(`There are no {{userType}} providers`, {
              userType: t(`${userType}`),
            })}
          </Title>
        ) : (
          <Title level={4}>
            {t(`Please enter an email to search for providers`)}
          </Title>
        )}
      </Row>
    </Row>
  );
};
