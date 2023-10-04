import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";

export const useLocale = (value: number | undefined) => {
  const { language } = useSelector((state: RootState) => state.i18n);
  const [local, setLocal] = useState<string>("en-US");

  useEffect(() => {
    setLocal(language === "enUS" ? "en-US" : "es-ES");
  }, [language]);

  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "number") {
    return Number(value).toLocaleString(local, {
      style: "currency",
      currency: "USD",
    });
  }

  return value;
};
