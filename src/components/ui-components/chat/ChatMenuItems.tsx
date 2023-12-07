import { useTranslation } from "react-i18next";
import {
  ClearOutlined,
  ExportOutlined,
  ImportOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const useChatMenuItems = () => {
  const { t } = useTranslation();
  const fontSize = "16px";

  const items = [
    {
      label: t("Group info"),
      key: "info",
      icon: <InfoCircleOutlined style={{ fontSize }} />,
    },
    {
      label: t("Join a group"),
      key: "join",
      icon: <ImportOutlined style={{ fontSize }} />,
    },
    {
      label: t("Leave group"),
      key: "leave",
      icon: <ExportOutlined style={{ fontSize }} />,
    },
    {
      label: t("empty chat"),
      key: "empty",
      icon: <ClearOutlined style={{ fontSize }} />,
    },
    {
      label: t("Setting"),
      key: "setting",
      icon: <SettingOutlined style={{ fontSize }} />,
    },
  ];

  return items;
};
