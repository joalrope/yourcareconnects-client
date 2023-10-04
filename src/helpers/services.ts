import { IItem } from "../components/ui-components/CategorySelect";

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
