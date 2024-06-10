import {
  App,
  Button,
  Col,
  Form,
  Input,
  //Pagination,
  //Radio,
  //RadioChangeEvent,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
//import { UserGrid } from "./UserGrid";
//import { useState } from "react";
import {
  clearContactsService,
  ratingsNormalizeService,
  userHardDeleteService,
} from "../../../../services";
import { DashboardAdmin } from "./DashboardAdmin";

const { Text, Title } = Typography;
//const { Search } = Input;

export enum TypeActiveUserStatus {
  ALL = "all",
  ACTIVE = "active",
  INACTIVE = "inactive",
  UNIQUE = "unique",
  DELETED = "deleted",
}

interface IUserDeleteData {
  email: string;
}

export const DashboardDev = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<IUserDeleteData>();
  const { modal } = App.useApp();
  //const [email, setEmail] = useState("");
  /*const [typeActiveUser, setTypeActiveUser] = useState(
    TypeActiveUserStatus.ALL
  );*/

  /*const onUserTypeChange = (e: RadioChangeEvent) => {
    setTypeActiveUser(e.target.value);
  };*/

  /*const onUserSearch = (value: string) => {
    setTypeActiveUser(TypeActiveUserStatus.UNIQUE);
    setEmail(value);
  };*/

  const clearContacts = async () => {
    const { ok, msg /*, result*/ } = await clearContactsService();

    if (ok) {
      modal.confirm({
        title: "Success",
        content: t(`${msg}`),
        onOk: () => {
          //console.log(result);
        },
      });
    }
  };

  const ratingsNormalize = async () => {
    const { ok, msg } = await ratingsNormalizeService();

    if (ok) {
      modal.confirm({
        title: "Success",
        content: t(`${msg}`),
        onOk: () => {
          //console.log(result);
        },
      });
    }
  };

  const onFinish = async ({ email }: IUserDeleteData) => {
    const { ok, msg /*, result*/ } = await userHardDeleteService(email);

    if (ok) {
      modal.confirm({
        title: "Success",
        content: t(`${msg}`, { email }),
        onOk: () => {
          form.resetFields();
          //console.log(result);
        },
      });
    }
  };

  return (
    <Row style={{ gap: 24, padding: 12 }}>
      {/*<Row>
        <Row
          style={{
            justifyContent: "flex-end",
            marginLeft: 22,
            marginRight: 0,
            marginTop: 10,
            marginBottom: 10,
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
              }}
            >
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
              <Search
                size="large"
                onSearch={onUserSearch}
                allowClear={true}
                placeholder="Search by email"
                style={{ width: 200 }}
                enterButton
              />
            </Radio.Group>
          </Col>
          <Col>
            <Pagination defaultCurrent={6} total={500} />
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            marginInline: 24,
            width: "100%",
          }}
        >
          <UserGrid userType={typeActiveUser} email={email} />
        </Row>
      </Row>*/}

      <DashboardAdmin />

      <Row
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: 10,
          flexDirection: "column",
          gap: 12,
          justifyContent: "center",
          marginTop: 48,
          marginInline: 24,
          marginBottom: 96,
          padding: 24,
          width: "100%",
        }}
      >
        <Row
          style={{
            justifyContent: "center",
            marginBottom: 24,
            userSelect: "none",
            width: "100%",
          }}
        >
          <Title
            style={{ display: "flex", justifyContent: "center" }}
            level={4}
          >
            {t("Developer Management")}
          </Title>
        </Row>

        <Row
          style={{
            gap: 24,
            justifyContent: "space-evenly",
            userSelect: "none",
            width: "100%",
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            style={{ paddingRight: 6, textAlign: "center" }}
          >
            <Button
              type="primary"
              onClick={clearContacts}
              style={{ width: "100%" }}
            >
              <Text ellipsis={true}>{t("Clear Contacts")}</Text>
            </Button>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} style={{ textAlign: "center" }}>
            <Form name="userDelete" form={form} onFinish={onFinish}>
              <Row
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                }}
                gutter={[4, 4]}
              >
                <Col xs={24} sm={24} md={10} lg={10}>
                  <Form.Item
                    label="Correo"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: `${t("Please input a email")}`,
                      },
                      {
                        type: "email",
                        message: `${t("Please input a valid email")}`,
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={14}
                  lg={14}
                  style={{ textAlign: "center" }}
                >
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ width: "100%" }}
                  >
                    <Text ellipsis={true}>
                      <Tooltip>{t("User hard delete")}</Tooltip>
                    </Text>
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            style={{ paddingRight: 6, textAlign: "center" }}
          >
            <Button
              type="primary"
              onClick={ratingsNormalize}
              style={{ width: "100%" }}
            >
              <Text ellipsis={true}>{t("Ratings Normalize")}</Text>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={4}
            lg={4}
            style={{ paddingRight: 6, textAlign: "center" }}
          >
            <Button
              type="primary"
              onClick={clearContacts}
              style={{ width: "100%" }}
            >
              <Text ellipsis={true}>{t("Limpiar Contacts")}</Text>
            </Button>
          </Col>
        </Row>
      </Row>
    </Row>
  );
};
