import { Avatar, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store";
import { setES, setUS } from "../../store/slices";

export const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { i18n } = useTranslation();

  const setLng = () => {
    if (language === "enUS") {
      i18n.changeLanguage("es");
      dispatch(setES());
    }
    if (language === "esES") {
      i18n.changeLanguage("en");
      dispatch(setUS());
    }
  };

  return (
    <Tooltip
      placement="top"
      title={"English/Español"}
      className="--tooltip-title__language"
    >
      <Avatar
        onClick={setLng}
        size={24}
        src={
          language === "enUS" ? "/images/US-flag.png" : "/images/ES-flag.png"
        }
        style={{ cursor: "pointer", marginLeft: "30px" }}
      />
    </Tooltip>
  );
};
