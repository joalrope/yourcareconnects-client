import { TFunction } from "i18next";
import { IItem } from "../components/ui-components/CategorySelect";

export const translate = (
  jsonArray: IItem[],
  t: TFunction<"translation", undefined, "translation">
) => {
  //

  if (!jsonArray) return;

  jsonArray.map((item) => {
    item.title = t(`${item.title}`);

    if (item.children) {
      translate(item.children, t);
    }
  });

  return JSON.parse(JSON.stringify(jsonArray));
};
