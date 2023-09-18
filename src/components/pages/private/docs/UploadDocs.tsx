import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchWithToken } from "../../../../helpers/fetch";
import { ProfilePicture } from "../../../ui-components/ProfilePicture";
import { IProvider } from "../../../forms/auth/ProviderForm";

export const UploadDocs = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<IProvider>();
  const { t } = useTranslation();

  const onFinish = async (values: IProvider) => {
    console.log(values);
    const { ok } = await fetchWithToken(`/users/${values.id}`, values, "PUT");

    if (ok) {
      form.resetFields();
      navigate("/dashboard");
    }
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
          name="upload"
          //valuePropName="fileList"
          //getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <ProfilePicture form={form} />
        </Form.Item>

        <Button type="primary" htmlType="submit" style={{ marginTop: "25px" }}>
          {t("Save")}
        </Button>
      </Form>
    </>
  );
};
