import { useTranslation } from "react-i18next";
import { IItem } from "../components/ui-components/category-select/interfaces";

export const servicesSort = (services: IItem[]) => {
  services.sort((a, b) => {
    const A = String(a.title).toUpperCase();
    const B = String(b.title).toUpperCase();

    if (A < B) return -1;
    if (A > B) return 1;
    return 0;
  });
};

export const getServicesToSearch = (services: string[]) => {
  const str = services
    .map((service) => {
      return service.split("|").pop();
    })
    .join(", ")
    .trim();

  if (str[str.length - 1] === ",") {
    return str.substring(0, str.length - 1);
  }

  return str;
};

export const useTranslatedServices = (services: string[] | undefined) => {
  const { t } = useTranslation();

  const result: string[] = [];

  if (!services) {
    return result;
  }

  services.map((service: string) => {
    const serv = String(service.split("|").pop());

    result.push(t(serv));
  });

  return result;
};
