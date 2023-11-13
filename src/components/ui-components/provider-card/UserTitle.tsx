import { useDispatch, useSelector } from "react-redux";
import { App, Button, Col, Row, Tooltip, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { UserAddOutlined } from "@ant-design/icons";
import { RootState } from "../../../store";
import { getUserById, updateUserContactsById } from "../../../services";
import { setUser } from "../../../store/slices";

const { Title } = Typography;

export const UserTitle = ({
  fullname,
  id,
}: {
  fullname: string | undefined;
  id: string;
}) => {
  const { message } = App.useApp();
  const { id: userId, contacts } = useSelector(
    (state: RootState) => state.user
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
          content: [<b>{fullname}</b>, t("was added to your contact list")],
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

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
      }}
    >
      <Col xs={19}>
        <Tooltip placement="top" title={fullname}>
          <Title level={5} ellipsis={true}>
            {fullname}
          </Title>
        </Tooltip>
      </Col>
      {!contacts?.includes(id) && (
        <Col xs={5}>
          <Tooltip placement="top" title={t("Add contact")}>
            <Button
              icon={<UserAddOutlined />}
              type="primary"
              onClick={() => handleAddContact(id)}
            />
          </Tooltip>
        </Col>
      )}
    </Row>
  );
};
