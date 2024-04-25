import { useState } from "react";
import {
  Col,
  Input,
  Pagination,
  PaginationProps,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from "antd";
import { ProviderCard } from "../../../ui-components/provider-card/ProviderCard";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { getUsersByIsActive } from "../../../../services";
import { useDispatch, useSelector } from "react-redux";
import { setClearProviders, setProviders } from "../../../../store/slices";
import { RootState } from "../../../../store";
import { IProvider } from "../../../../interface/provider";
import { getUserByEmail } from "../../../../services/userService";

const { Search } = Input;
const { Title } = Typography;
const gutter = 16;

export enum TypeActiveUserStatus {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
  UNIQUE = "unique",
  DELETED = "deleted",
}

export const UserGrid = () => {
  const dispatch = useDispatch();
  const providers = useSelector((state: RootState) => state.providers);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(3);
  const [totalPage, setTotalPage] = useState(0);
  const [email, setEmail] = useState("");
  const [typeActiveUser, setTypeActiveUser] = useState(
    TypeActiveUserStatus.ALL
  );

  useEffect(() => {
    dispatch(setClearProviders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;

      try {
        if (typeActiveUser === "unique") {
          response = await getUserByEmail(email);
        } else {
          response = await getUsersByIsActive(typeActiveUser);
        }
      } catch (error) {
        console.log(error);
      }

      const {
        result: { users, total },
      } = response;

      setTotalPage(total);

      if (!users) {
        dispatch(setClearProviders());
        return null;
      }

      if (typeActiveUser !== "unique") {
        const filteredUsers = users.filter(
          (user: IProvider) =>
            user.role !== "owner" &&
            user.role !== "developer" &&
            user.role !== "superadmin"
        );
        dispatch(setClearProviders());
        dispatch(setProviders(filteredUsers));
        return null;
      }

      dispatch(setClearProviders());
      dispatch(setProviders(users));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUserTypeChange = (e: RadioChangeEvent) => {
    dispatch(setClearProviders());
    setTypeActiveUser(e.target.value);
  };

  const onUserSearch = (value: string) => {
    setTypeActiveUser(TypeActiveUserStatus.UNIQUE);
    setEmail(value);
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <Row
      gutter={[gutter, gutter]}
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 10,
        padding: 24,
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "40hv",
        userSelect: "none",
        width: "100%",
      }}
      className="animate__animated animate__fadeIn animate__delay-0.3s"
    >
      <Title
        style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}
        level={4}
      >
        {t("Customer and provider management")}
      </Title>
      <Row
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
        gutter={[24, 24]}
      >
        <Col>
          <Radio.Group
            onChange={onUserTypeChange}
            value={typeActiveUser}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <Col xs={24} sm={24} md={12} lg={12}>
              <Search
                size="large"
                onSearch={onUserSearch}
                allowClear={true}
                placeholder="Search by email"
                enterButton
              />
            </Col>
            <Col>
              <Radio value={TypeActiveUserStatus.ALL}>
                <Title level={5}>{t("All Users")}</Title>
              </Radio>
              <Radio value={TypeActiveUserStatus.INACTIVE}>
                <Title level={5}> {t("Inactive Providers")}</Title>
              </Radio>
              <Radio value={TypeActiveUserStatus.ACTIVE}>
                <Title level={5}> {t("Active Providers")}</Title>
              </Radio>
              <Radio value={TypeActiveUserStatus.DELETED}>
                <Title level={5}> {t("Deleted Providers")}</Title>
              </Radio>
            </Col>
          </Radio.Group>
        </Col>
      </Row>

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
              <Col
                className="animate__animated animate__fadeIn animate__delay-0.3s"
                style={{ width: "250px" }}
                key={provider.id}
              >
                <ProviderCard provider={provider} small={true} />
              </Col>
            );
          })
        ) : typeActiveUser !== "unique" ? (
          <Title level={4}>
            {t(`There are no {{userType}} providers`, {
              userType: t(`${typeActiveUser}`),
            })}
          </Title>
        ) : (
          <Title level={4}>
            {t(`Please enter an email to search for providers`)}
          </Title>
        )}
      </Row>
      <Row justify={"center"} style={{ height: "5vh" }}>
        {providers?.length > 0 && (
          <Pagination
            total={totalPage}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            defaultPageSize={10}
            defaultCurrent={currentPage}
            onChange={onChange}
          />
        )}
      </Row>
    </Row>
  );
};
