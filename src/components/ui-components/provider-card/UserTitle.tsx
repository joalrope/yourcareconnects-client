import { useNavigate } from "react-router-dom";
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
  UserDeleteOutlined,
} from "@ant-design/icons";
import { RootState } from "../../../store";
import {
  deleteUserById,
  getUserById,
  restoreUserById,
  updateActiveUserStatus,
  updateRoleUser,
  updateUserContactsById,
} from "../../../services";
import {
  deleteProvider,
  setUser,
  updateActiveProvStatus,
  updateDeletedProvStatus,
} from "../../../store/slices";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect, useState } from "react";

const { Text, Title } = Typography;

interface Props {
  picture: string | undefined;
  fullname: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  id: string;
  contact: boolean;
  isAllowedViewData: boolean | undefined;
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
  isAllowedViewData,
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
  const navigate = useNavigate();
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
      } = await updateUserContactsById(userId, id, true);

      if (ok) {
        message.success({
          content: [
            <b key={"1"}>{userFullname}</b>,
            <span key={"2"}>{` ${t("and")} `}</span>,
            <b key={"3"}>{fullname} </b>,
            t("now are contacts"),
          ],
          duration: 4,
        });
        dispatch(setUser(user));
        navigate(`/chat`);
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

  const handleDeleteContact = async (id: string) => {
    const {
      ok,
      result: { fullname },
    } = await getUserById(id);

    if (ok) {
      const {
        ok,
        msg,
        result: { user },
      } = await updateUserContactsById(userId, id, false);

      if (ok) {
        message.success({
          content: [
            <b key={"1"}>{userFullname}</b>,
            <span key={"2"}>{` ${t("and")} `}</span>,
            <b key={"3"}>{fullname} </b>,
            t("are no longer contacts"),
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
      dispatch(deleteProvider(id));
    }
  };

  const handleDeleteProvider = async (id: string) => {
    if (!userLoggedIn) {
      return;
    }

    modal.confirm({
      title: t(`Are you sure you want to {{delete}} {{fullname}}`, {
        fullname,
        delete: !isDeleted ? t("delete") : t("restore"),
      }),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk: async () => {
        let ok;
        let result;

        if (!isDeleted) {
          ({ ok, result } = await deleteUserById(id));

          if (ok) {
            dispatch(updateDeletedProvStatus({ id, isDeleted: true }));

            message.success({
              content: t(
                `${t("The user {{fullname}} was deleted", {
                  fullname: result.user.fullname,
                })}`
              ),
              duration: 3,
            });

            dispatch(deleteProvider(id));

            return;
          }
        } else {
          ({ ok, result } = await restoreUserById(id));

          if (ok) {
            dispatch(updateDeletedProvStatus({ id, isDeleted: false }));

            message.success({
              content: t(
                `${t("The user {{fullname}} was restored", {
                  fullname: result.user.fullname,
                })}`
              ),
              duration: 3,
            });

            dispatch(deleteProvider(id));

            return;
          }
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
        justifyContent: contact ? "space-evenly" : "flex-start",
        width: "100%",
      }}
    >
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 12,
          width: "100%",
        }}
      >
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
                <Row style={{ flexDirection: "column", gap: 8, width: "100%" }}>
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
                </Row>
              </Col>
            </Row>
            <Col style={{ width: "100%" }}>
              <Title level={5} style={{ margin: 0, marginTop: 12 }}>
                {t("User type")}:
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
                    label: `${t("Superadmin")}`,
                  },
                  {
                    value: "customer",
                    label: `${t("Customer")}`,
                  },
                  {
                    value: "provider",
                    label: `${t("Provider")}`,
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
        {isAllowedViewData ? (
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
        ) : (
          userLoggedIn && (
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
                <Text style={{ fontSize: 12, marginTop: 8 }}>
                  {phoneNumber}
                </Text>
              </Col>
            </Row>
          )
        )}
      </Col>
      {
        <Col xs={contact ? 24 : 5} style={{ textAlign: "right" }}>
          {
            <Tooltip
              placement="top"
              title={
                contacts?.includes(id) ? t("Delete contact") : t("Add contact")
              }
            >
              <Button
                icon={
                  !contacts?.includes(id) ? (
                    <UserAddOutlined />
                  ) : (
                    <UserDeleteOutlined />
                  )
                }
                type={!contacts?.includes(id) ? "primary" : "default"}
                onClick={() =>
                  !contacts?.includes(id)
                    ? handleAddContact(id)
                    : handleDeleteContact(id)
                }
                style={{
                  backgroundColor: !contacts?.includes(id) ? "" : "red",
                }}
              />
            </Tooltip>
          }
        </Col>
      }
    </Row>
  );
};
