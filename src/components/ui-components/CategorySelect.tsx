import { ReactNode, useCallback, useEffect, useState } from "react";
import { Col, FormInstance, Row, Tag, TreeSelect } from "antd";
import { PlusSquareOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getServices } from "../../services/serviceService";
import { useTranslation } from "react-i18next";
import { IProvider } from "../forms/auth/ProviderForm";
import { ServiceForm } from "../forms/service/ServiceForm";
import { useDispatch /*useSelector*/, useSelector } from "react-redux";
import {
  setNewService,
  setPathNewService,
  setServiceFormVisible,
} from "../../store/slices";
import { servicesSort } from "../../helpers/sort";
import { translate } from "../../helpers/translate";
import { RootState } from "../../store";

export interface IItem {
  checkable?: boolean;
  children?: Children[];
  selectable?: boolean;
  icon?: React.ReactNode;
  tagColor: Colors;
  title: string | React.ReactNode;
  value: string | React.ReactNode;
}

interface Colors {
  bgc: string;
  frc: string;
}

interface Props {
  form: FormInstance<IProvider>;
  formatted?: boolean;
  editable: boolean;
  sortable?: boolean;
}

interface Children {
  value: string | React.ReactNode;
  title: string | React.ReactNode;
  tagColor: Colors;
  children?: Children[];
}

export const CategorySelect = ({
  form,
  formatted,
  editable,
  sortable,
}: Props) => {
  const dispatch = useDispatch();
  //const { newService } = useSelector((state: RootState) => state.service);
  const { t } = useTranslation();
  const { language } = useSelector((state: RootState) => state.i18n);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IItem[] | undefined>();
  const [value, setValue] = useState<string[]>();

  const handleClick = useCallback(
    (value: string | ReactNode) => {
      const splited = String(value).split("|");
      const len = splited.length - 1;
      const pathNewService = splited.slice(0, len).join("|");

      dispatch(setPathNewService(pathNewService));
      setOpen(false);
      dispatch(setServiceFormVisible());
    },
    [dispatch]
  );

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      const {
        result: { services: serviceDB },
      } = await getServices();

      const services = translate(serviceDB, t);

      if (sortable) servicesSort(services);

      if (editable) pushAddService(services, language);

      if (formatted) formatterServiceItems(services, handleClick);

      setData(services);
      dispatch(setNewService(""));
    };

    fetchData();
  }, [formatted, editable, sortable, handleClick, dispatch, open, t, language]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);

    form.setFieldsValue({
      ...form.getFieldsValue(),
      services: newValue,
    });
  };

  return (
    <>
      <ServiceForm />
      <TreeSelect
        allowClear
        autoClearSearchValue={false}
        dropdownStyle={{ maxHeight: "100%", overflow: "auto" }}
        multiple
        onBlur={() => setOpen(false)}
        onChange={onChange}
        onFocus={() => setOpen(true)}
        open={open}
        placeholder={t("Please select your services")}
        showSearch
        switcherIcon={<PlusSquareOutlined style={{ fontSize: "14px" }} />}
        tagRender={(tag) => {
          const { label, onClose } = tag;
          return (
            <Tag closable onClose={onClose}>
              {label}
            </Tag>
          );
        }}
        treeCheckable
        treeData={data}
        treeLine={true}
        value={value}
      />
    </>
  );
};

const pushAddService = (services: IItem[], locale: string, value = "") => {
  const addCategoryItem = {
    tagColor: {
      bgc: "red",
      frc: "red",
    },
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

const formatterServiceItems = (
  services: IItem[],
  handleClick: (value: string | React.ReactNode) => void
) => {
  services.map((item) => {
    const bgc = item.tagColor?.frc ? `${item.tagColor.frc}20` : "#fbd467";
    const frc = item.tagColor?.frc ? `${item.tagColor.frc}` : "#fbd467";

    item.title = (
      <Row>
        {item.checkable === false ? (
          <Col
            xs={24}
            style={{
              backgroundColor: "#fbd467",
              border: `1px solid black`,
              borderRadius: 4,
              color: "black",
              fontSize: 12,
              paddingInline: 12,
            }}
            onClick={() => {
              handleClick(item.value);
            }}
          >
            <PlusCircleOutlined
              style={{
                marginRight: 12,
              }}
            />
            <b>{item.title}</b>
          </Col>
        ) : (
          <Col
            xs={24}
            style={{
              backgroundColor: bgc,
              border: `1px solid ${frc}`,
              color: frc,
              borderRadius: 4,
              paddingInline: 12,
            }}
          >
            {item.title}{" "}
          </Col>
        )}
      </Row>
    );
    if (item.children && item.children.length > 0) {
      formatterServiceItems(item.children, handleClick);
    }
  });
};
