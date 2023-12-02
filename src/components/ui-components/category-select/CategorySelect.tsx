import { ReactNode, useCallback, useEffect, useState } from "react";
import { Tag, TreeSelect, message } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { getServices } from "../../../services/serviceService";
import { useTranslation } from "react-i18next";
import { ServiceForm } from "../../forms/service/ServiceForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setNewService,
  setPathNewService,
  setServiceFormVisible,
} from "../../../store/slices";
import { servicesSort } from "../../../helpers/services";
import { translate } from "../../../helpers/translate";
import { RootState } from "../../../store";
import { pushAddService } from "./pushAddService";
import { formatterServiceItems } from "./FormatterServiceItems";
import { IItem, Props } from "./interfaces";

export const CategorySelect = ({
  form,
  initValues = [],
  formatted,
  editable,
  sortable,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { language } = useSelector((state: RootState) => state.i18n);
  const { pathNewService } = useSelector((state: RootState) => state.service);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IItem[] | undefined>();

  const [value, setValue] = useState<string[]>([]);

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

  const onChange = (newValue: string[]) => {
    setValue(newValue);

    form.setFieldsValue({
      ...form.getFieldsValue(),
      services: newValue,
    });
  };

  useEffect(() => {
    setValue(initValues);
  }, [initValues]);

  return (
    <>
      <ServiceForm />
      <TreeSelect
        allowClear
        autoClearSearchValue={false}
        dropdownStyle={{ maxHeight: "300px", overflow: "auto" }}
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
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
        treeData={data}
        treeLine={true}
        value={value}
        style={{ width: "100%" }}
      />
    </>
  );
};
