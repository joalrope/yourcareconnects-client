import { useEffect } from "react";
import { App } from "antd";
import { useTranslation } from "react-i18next";
import { useContent } from "../../../../hooks/useContent";
import { ProviderForm } from "../../../forms/auth/provicer-form/ProviderForm";

export const Profile = () => {
  const { t } = useTranslation();
  const content = useContent();
  const { modal } = App.useApp();

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        modal.info({
          title: t("Please activate Geolocation permission"),
          content,
          width: "50%",
          okText: t("Agreed"),
          autoFocusButton: "ok",
          style: {
            marginTop: "0vh",
          },
          onOk() {
            //setViewMap(false);
          },
        });
        return;
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProviderForm />;
};
