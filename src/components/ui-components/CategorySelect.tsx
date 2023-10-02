import { ReactNode, useCallback, useEffect, useState } from "react";
import { Col, FormInstance, Row, Tag, TreeSelect, message } from "antd";
import { PlusSquareOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { getServices } from "../../services/serviceService";
import { useTranslation } from "react-i18next";
//import { IProvider } from "../forms/auth/ProviderForm";
import { ServiceForm } from "../forms/service/ServiceForm";
import { useDispatch /*useSelector*/, useSelector } from "react-redux";
import {
  setLoading,
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
  tagColor?: string;
  title: string | React.ReactNode;
  value: string | React.ReactNode;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  formatted?: boolean;
  editable: boolean;
  sortable?: boolean;
}

interface Children {
  value: string | React.ReactNode;
  title: string | React.ReactNode;
  tagColor: string;
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
  const { pathNewService } = useSelector((state: RootState) => state.service);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IItem[] | undefined>();

  const initValServForm = form.getFieldValue("services");

  const servs = initValServForm ? initValServForm : [];

  const services = servs.map((serv: IItem) => {
    return { key: serv, value: serv };
  });

  const [value, setValue] = useState<IItem[]>(services);

  const handleClick = useCallback(
    (value: string | ReactNode) => {
      const splited = String(value).split("|");
      const len = splited.length - 1;
      const currentPathNewService = splited.slice(0, len).join("|");

      dispatch(setPathNewService(currentPathNewService));
      setOpen(false);
      dispatch(setServiceFormVisible());
    },
    [dispatch]
  );

  const customizeServices = useCallback(
    (servicesDB: IItem[]) => {
      const services = translate(servicesDB, t);

      if (sortable) servicesSort(services);

      if (editable) pushAddService(services, language);

      if (formatted) formatterServiceItems(services, handleClick);

      setData(services);
      dispatch(setNewService(""));
    },
    [dispatch, handleClick, editable, formatted, language, sortable, t]
  );

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      dispatch(setLoading(true));
      const {
        ok,
        result: { services: servicesDB },
      } = await getServices();
      dispatch(setLoading(false));

      if (!ok) {
        message.open({
          type: "error",
          content: "This is an error message",
        });
      }

      customizeServices(servicesDB);
    };

    fetchData();
  }, [customizeServices, dispatch, pathNewService]);

  const onChange = (newValue: IItem[]) => {
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
        style={{ width: "100%" }}
      />
    </>
  );
};

const pushAddService = (services: IItem[], locale: string, value = "") => {
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

const formatterServiceItems = (
  services: IItem[],
  handleClick: (value: string | React.ReactNode) => void
) => {
  services.map((item) => {
    const bgc = `${item.tagColor}20`;
    const frc = `${item.tagColor}`;

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
