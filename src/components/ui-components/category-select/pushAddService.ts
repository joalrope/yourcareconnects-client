import { IItem } from "./interfaces";

export const pushAddService = (
  services: IItem[],
  locale: string,
  value = ""
) => {
  const addCategoryItem = {
    tagColor: "red",
    checkable: false,
    selectable: false,
    value: `${value}|${"Add new service"}`,
    title: locale === "enUS" ? "Add new service" : "Agregar Nuevo Servicio",
  };

  services.push(addCategoryItem);

  services.map((item) => {
    if (item.children && item.children.length > 0) {
      pushAddService(item.children, locale, String(item.value));
    }
  });
};
