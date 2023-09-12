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
