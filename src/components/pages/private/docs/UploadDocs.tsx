import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { App, Button, Form } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useTranslation } from "react-i18next";
import {
  ProfilePicture,
  handleUpload,
} from "../../../ui-components/ProfilePicture";
import { IProvider } from "../../../forms/auth/ProviderForm";

export const UploadDocs = () => {
  const { message } = App.useApp();
  //const navigate = useNavigate();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const pictureName = "profile";

  const onFinish = async (/*values: IProvider*/) => {
    const { ok, msg } = await handleUpload(fileList, pictureName);

    if (!ok) {
      message.error(t(`${msg}`));
      return;
    }

    setFileList([]);
    form.resetFields();
    message.success(`${msg}`);
    //navigate("/dashboard");
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
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
        style={{
          width: "100%",
        }}
        //initialValues={{conditions: false,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name={pictureName}
          //valuePropName="fileList"
          //getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <ProfilePicture
            form={form}
            pictureName={pictureName}
            fileList={fileList}
            setFileList={setFileList}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginTop: "25px" }}>
          {t("Save")}
        </Button>
      </Form>
    </>
  );
};
