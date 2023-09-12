import { IItem } from "../components/ui-components/CategorySelect";

export const pushAddService = (services: IItem[], value: string) => {
  const addCategoryItem = {
    tagColor: {
      bgc: "white",
      frc: "blue",
    },
    checkable: false,
    value: value,
    title: "Add new service",
  };

  services.push(addCategoryItem);

  services.map((item, index) => {
    if (item.children && item.children.length > 0) {
      console.log(item.value);
      pushAddService(item.children, String(`${item.value}${index}`));
    }
  });
};
