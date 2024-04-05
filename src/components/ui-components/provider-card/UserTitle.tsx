import { useDispatch, useSelector } from "react-redux";
import {
  App,
  Button,
  Checkbox,
  Col,
  Row,
  Select,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import {
  DeleteOutlined,
  RestOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { RootState } from "../../../store";
import {
  getUserById,
  updateActiveUserStatus,
  updateRoleUser,
  updateUserContactsById,
} from "../../../services";
import {
  deleteProvider,
  setUser,
  updateActiveProvStatus,
} from "../../../store/slices";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";
import { deleteUserById } from "../../../services/userService";

const { Text, Title } = Typography;

interface Props {
  picture: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  id: string;
  contact: boolean;
  isActive: boolean | undefined;
  isDeleted: boolean | undefined;
  small: boolean;
  role: string | undefined;
}

export const UserTitle = ({
  picture,
  fullname,
  email,
  phoneNumber,
  id,
  contact,
  isActive,
  isDeleted,
  small,
  role,
}: Props) => {
  const { message, modal } = App.useApp();
  const {
    id: userId,
    contacts,
    role: rolePassed,
    fullname: userFullname,
  } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(isActive);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(role as string);

  useEffect(() => {
    if (
      rolePassed === "owner" ||
      rolePassed === "developer" ||
      rolePassed === "superadmin"
    ) {
      setUserLoggedIn(true);
    }
  }, [rolePassed]);

  const handleAddContact = async (id: string) => {
    const {
      ok,
      result: { fullname },
    } = await getUserById(id);

    if (ok) {
      const {
        ok,
        msg,
        result: { user },
      } = await updateUserContactsById(userId, id);

      if (ok) {
        message.success({
          content: [
            <b key={"1"}>{userFullname}</b>,
            <span key={"2"}>{` ${t("and")} `}</span>,
            <b key={"3"}>{fullname}</b>,
            t(" now are contacts"),
          ],
          duration: 4,
        });
        dispatch(setUser(user));
        return;
      } else {
        message.error({
          content: t(`${msg}`),
          duration: 3,
        });
        return;
      }
    }
    message.error({
      content: "Something went wrong",
      duration: 3,
    });
  };

  const onActivateChange = async (id: string, e: CheckboxChangeEvent) => {
    const {
      ok,
      result: { user },
    } = await updateActiveUserStatus(id, e.target.checked);

    dispatch(updateActiveProvStatus({ id, isActive: e.target.checked }));

    if (ok) {
      setActive(!active);
      message.success({
        content: t(
          `${t("The user")} ${user.fullname} ${t("was")} ${
            e.target.checked ? t("Activated") : t("Deactivated")
          }`
        ),
        duration: 3,
      });
    }
  };

  const handleDeleteProvider = async (id: string) => {
    modal.confirm({
      title: t(`Are you sure you want to {{delete}} {{fullname}}`, {
        fullname,
        delete: !isDeleted ? t("delete") : t("restore"),
      }),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk: async () => {
        const {
          ok,
          result: { user },
        } = await deleteUserById(id);

        if (ok) {
          dispatch(deleteProvider(id));

          message.success({
            content: t(
              `${t("The user {{fullname}} was deleted", {
                fullname: user.fullname,
              })}`
            ),
            duration: 3,
          });

          return;
        }

        //TODO: HANDLE ERROR
        message.error({
          content: t(`${t("Sorry, we couldn't remove it. Please try later")}`),
          duration: 3,
        });
      },
    });

    return;
  };

  const handleRoleChange = async (value: string[]) => {
    setUserRole(value.toString());
    const {
      ok,
      result: { user },
    } = await updateRoleUser(id, value.toString());

    if (ok) {
      message.success({
        content: t(
          `${t("User")} ${user.fullname} ${t("now has the role: ")} ${value}`
        ),
        duration: 3,
      });
    }
  };

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: contact ? "column" : "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Col>
        {small && (
          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: 12,
              width: "100%",
            }}
          >
            <Row style={{ justifyContent: "space-between", width: "100%" }}>
              <Col>
                <img src={picture} alt={`Picture of ${fullname}`} width={60} />
              </Col>

              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {userLoggedIn && (
                  <Checkbox
                    onChange={(e) => onActivateChange(id, e)}
                    style={{ justifyContent: "flex-end", width: "100%" }}
                    checked={active}
                    defaultChecked={isActive}
                  >
                    {isActive ? t("Activated") : t("Deactivate")}
                  </Checkbox>
                )}
              </Col>
            </Row>
            <Col style={{ width: "100%" }}>
              <Title level={5} style={{ margin: 0, marginTop: 12 }}>
                {t("User type:")}
              </Title>
              <Select
                style={{ width: "100%" }}
                size={"large"}
                value={[userRole]}
                placeholder="Please select"
                defaultValue={["customer"]}
                onChange={handleRoleChange}
                options={[
                  {
                    value: "superadmin",
                    label: "Superadmin",
                  },
                  {
                    value: "customer",
                    label: "Customer",
                  },
                  {
                    value: "provider",
                    label: "Provider",
                  },
                ]}
              />
            </Col>
          </Row>
        )}
      </Col>
      <Col xs={!contact ? 19 : 24}>
        <Title
          level={5}
          ellipsis={true}
          style={{ margin: 0 }}
          onClick={() => handleDeleteProvider(id)}
        >
          {userLoggedIn && (
            <Tooltip
              placement="top"
              title={!isDeleted ? t("Delete Provider") : t("Restore Provider")}
            >
              {isDeleted ? (
                <RestOutlined
                  style={{ color: "green", cursor: "pointer", fontSize: 22 }}
                />
              ) : (
                <DeleteOutlined
                  style={{ color: "red", cursor: "pointer", fontSize: 18 }}
                />
              )}
            </Tooltip>
          )}
          {userLoggedIn && " "}
          <Tooltip placement="top" title={fullname}>
            {fullname}
          </Tooltip>
        </Title>
        {contact && (
          <Row style={{ flexDirection: "column" }}>
            <Tooltip
              placement="leftTop"
              title={email}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                <a href={`mailto:${email}`}>{email}</a>
              </Text>
            </Tooltip>

            <Col>
              <Text style={{ fontSize: 12, marginTop: 8 }}>{phoneNumber}</Text>
            </Col>
          </Row>
        )}
      </Col>
      {!contacts?.includes(id) && (
        <Col xs={contact ? 24 : 5} style={{ textAlign: "right" }}>
          {!contact && (
            <Tooltip placement="top" title={t("Add contact")}>
              <Button
                icon={<UserAddOutlined />}
                type="primary"
                onClick={() => handleAddContact(id)}
              />
            </Tooltip>
          )}
        </Col>
      )}
    </Row>
  );
};
