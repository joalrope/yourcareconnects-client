import { useEffect, useState } from "react";
import { FormInstance, Tag, TreeSelect } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { getServices } from "../../services/categoryService";
import { useTranslation } from "react-i18next";
import { IProvider } from "../forms/ProviderForm";

//const { TreeNode } = TreeSelect;

interface Colors {
  bgc: string;
  frc: string;
}

export interface Item {
  value: string;
  title: string;
  tagColor: Colors;
  children: Item[];
}

interface Props {
  form: FormInstance<IProvider>;
}

export const CategorySelect = ({ form }: Props) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Item[] | undefined>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      const {
        result: { services },
      } = await getServices();

      setData(services);
    };

    fetchData();
  }, []);

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
    form.setFieldsValue({
      ...form.getFieldsValue(),
      services: [newValue],
    });
  };

  /*  const CategoryOptions = data?.map((item) => (
    <Select.Option
      key={item.value}
      value={item.value}
      title={<span>{item.title}</span>}
    >
      <span> {item.title}</span> - <span>{item.title}</span>
    </Select.Option>
  )); */

  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: "100%", overflow: "auto" }}
      placeholder={t("Please select your services")}
      allowClear
      multiple
      autoClearSearchValue={false}
      treeCheckable
      treeLine={true}
      treeData={data}
      onChange={onChange}
      switcherIcon={<PlusSquareOutlined />}
      tagRender={(tag) => {
        const { label, onClose } = tag;
        const colors = findTagColor(data, String(label));
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const { bgc, frc } = colors![0];

        return (
          <Tag
            closable
            onClose={onClose}
            style={{ backgroundColor: `${bgc}`, color: `${frc}` }}
          >
            {label}
          </Tag>
        );
      }}
    />
    /*  {data?.map(({ value, children }: Item) => {
        return (
          <TreeNode key={value} value={value}>
            {children.length > 0 && <TreeSelect treeData={children} />}
          </TreeNode>
        );
      })}
    </TreeSelect>*/
  );
};

const findTagColor = (
  services: Item[] | undefined,
  value: string,
  tagColor: Colors[] = []
) => {
  if (!services) {
    return;
  }

  const color = tagColor;

  for (let i = 0; i < services.length; i++) {
    const obj = services[i];
    if (obj.title === value) {
      color.push(obj.tagColor);
      break;
    }
    if (obj.children) {
      findTagColor(obj.children, value, color);
    }
  }

  if (color[0] === undefined) {
    color[0] = { bgc: "#fbd467", frc: "#1a1a13" };
  }
  return color;
};
