import { useDispatch, useSelector } from "react-redux";
import { App, Button, Checkbox, Col, Row, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserAddOutlined } from "@ant-design/icons";
import { RootState } from "../../../store";
import {
  getUserById,
  updateActiveUserStatus,
  updateUserContactsById,
} from "../../../services";
import { setUser } from "../../../store/slices";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";

const { Text, Title } = Typography;

interface Props {
  fullname: string | undefined;
  email: string | undefined;
  id: string;
  contact: boolean;
  isActive: boolean | undefined;
  small: boolean;
}

export const UserTitle = ({
  fullname,
  email,
  id,
  contact,
  isActive,
  small,
}: Props) => {
  const { message } = App.useApp();
  const {
    id: userId,
    contacts,
    fullname: userFullname,
  } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(isActive);

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
            <Col>
              <img
                src="/images/logo.png"
                alt="logo yourcareconnects.com"
                width={60}
              />
            </Col>

            <Col>
              <Checkbox
                onChange={(e) => onActivateChange(id, e)}
                style={{ justifyContent: "flex-end", width: "100%" }}
                value={active}
                defaultChecked={isActive}
              >
                {t("Activate")}
              </Checkbox>
            </Col>
          </Row>
        )}
      </Col>
      <Col xs={!contact ? 19 : 24}>
        <Tooltip placement="top" title={fullname}>
          <Title level={5} ellipsis={true} style={{ margin: 0 }}>
            {fullname}
          </Title>
        </Tooltip>
        {contact && (
          <Tooltip
            placement="leftTop"
            title={email}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Text style={{ fontSize: 12 }}>
              <a href={`mailto:${email}`}>{email}</a>
            </Text>
          </Tooltip>
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
