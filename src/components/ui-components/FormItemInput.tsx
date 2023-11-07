import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  label: string;
}

export const FormItemInput = ({ name, label }: Props) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      label={t(label)}
      name={name}
      style={{
        width: "100%",
        marginBottom: "6px",
      }}
    >
      <Input placeholder={`${t(label).toLowerCase()}`} />
    </Form.Item>
  );
};
