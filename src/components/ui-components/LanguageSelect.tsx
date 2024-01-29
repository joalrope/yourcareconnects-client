import { Select } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setES, setUS } from "../../store/slices";

export const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const handleChange = (value: string) => {
    if (value === "es") {
      i18n.changeLanguage("es");
      dispatch(setES());
    }
    if (value === "en") {
      i18n.changeLanguage("en");
      dispatch(setUS());
    }
  };

  return (
    <Select
      style={{ width: 120 }}
      onChange={handleChange}
      value={i18n.language}
      options={[
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
      ]}
    />
  );
};
