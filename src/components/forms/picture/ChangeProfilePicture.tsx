import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { App, Button, Col, Form, Row } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setProfilePicture } from "../../../store/slices";
import {
  ProfilePicture,
  handleUpload,
} from "../../ui-components/ProfilePicture";
import { IProvider } from "../auth/provicer-form/interfaces";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const ChangeProfilePicture = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const { id, names, pictures } = user;

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      url: `${baseUrl}/images/${id}/${pictures?.profile}`,
      name: `${names} image`,
    },
  ]);
  const [isOriginalPicture, setIsOriginalPicture] = useState(true);

  let pictureName = "";

  useEffect(() => {
    if (fileList[0]?.uid === "-1") {
      setIsOriginalPicture(false);
    } else {
      setIsOriginalPicture(true);
    }
  }, [fileList]);

  const onFinish = async () => {
    pictureName = fileList[0].name;

    console.log({ pictureName });
    const { ok, msg } = await handleUpload(fileList, pictureName);

    if (!ok) {
      message.error(t(`${msg}`));
      return;
    }

    setFileList([
      {
        uid: "-1",
        url: `${baseUrl}/images/${id}/${pictureName}`,
        name: `${names} image`,
      },
    ]);
    dispatch(setProfilePicture({ profile: pictureName }));
    form.resetFields();
    message.success(t(`${msg}`));
  };

  const onFinishFailed = (errorInfo: unknown) => {
    message.error(`${t("There are fields not supplied")}:${errorInfo}`);
  };

  return (
    <>
      <Form
        name="providerRegister"
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Col>
            <Form.Item
              name={pictureName}
              rules={[{ required: true }]}
              style={{ marginBottom: 0 }}
            >
              <ProfilePicture
                form={form}
                pictureName={pictureName}
                fileList={fileList}
                setFileList={setFileList}
              />
            </Form.Item>
          </Col>

          <Col>
            <Button
              disabled={!isOriginalPicture}
              type="primary"
              htmlType="submit"
              style={{ fontSize: 10, height: 25, paddingInline: 6 }}
            >
              {t("Change image")}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
