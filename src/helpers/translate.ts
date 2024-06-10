import { TFunction } from "i18next";
import { IItem } from "../components/ui-components/category-select/interfaces";

export const translateServices = (
  jsonArray: IItem[],
  t: TFunction<"translation", undefined, "translation">
) => {
  //

  if (!jsonArray) return;

  jsonArray.map((item) => {
    const value: string[] = [];
    let translateValue = "";

    if (item.value?.toString().includes("|")) {
      const arrayValue = item.value?.toString().split("|");

      for (const subValue of arrayValue) {
        value.push(t(subValue));
      }

      translateValue = value.join("|");
    }

    item.value = translateValue || t(`${item.value}`);
    item.title = t(`${item.title}`);

    if (item.children) {
      translateServices(item.children, t);
    }
  });

  return JSON.parse(JSON.stringify(jsonArray));
};

export const translateService = (
  items: string[],
  t: TFunction<"translation", undefined, "translation">
) => {
  const translateItems = items.map((item) => {
    const splitedItem = item.split("|");

    const translateItem = splitedItem.map((subItem) => {
      return t(subItem);
    });

    return translateItem.join("|");
  });

  return translateItems;
};
