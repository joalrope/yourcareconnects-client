import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorPicker, Form, Input } from "antd";

import { RootState } from "../../../store";
import { setNewService, setServiceFormHide } from "../../../store/slices";
import { ModalForm } from "../../wrappers/ModalForm";

import type { FormInstance } from "antd";
import { addNewService, updateService } from "../../../services/serviceService";

export interface Options {
  label: ReactNode;
  value: string;
}

const NewService = ({ form }: { form: FormInstance }) => {
  /*const hexString = useMemo(
    () => (typeof colorHex === "string" ? colorHex : colorHex.toHexString()),
    [colorHex]
  );*/

  return (
    <Form
      name="add-service-form"
      form={form}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{ bgColor: "#fbd467" }}
    >
      <Form.Item
        className="--form-item__container"
        name="inputNewService"
        label="Indique el nuevo servicio"
        rules={[
          {
            required: true,
            message: "Please input a category",
          },
          {
            pattern: new RegExp(/^[^|]*$/),
            message:
              "The slash character ( | ) is not allowed, please remove it",
          },
        ]}
      >
        <Input placeholder="Input a new service" />
      </Form.Item>
      <Form.Item
        className="--form-item__container"
        name="bgColor"
        label="Seleccione color del servicio"
      >
        <ColorPicker
          onChange={(_date, dateString) => {
            form.setFieldsValue({ bgColor: dateString });
          }}
        />
      </Form.Item>
    </Form>
  );
};

export const ServiceForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const {
    serviceForm: { show },
  } = useSelector((state: RootState) => state.form);
  const { pathNewService } = useSelector((state: RootState) => state.service);

  const mode = "add";
  const onOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        const title: string = values.inputNewService;
        const color: string = values.bgColor;
        const parent = pathNewService.replaceAll("|", ".");

        if (parent !== "") {
          updateService(parent, title, color);
          dispatch(setNewService(title));
        } else {
          addNewService(title, color);
          dispatch(setNewService(title));
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });

    dispatch(setServiceFormHide());
  };

  const onCancel = () => {
    form.resetFields();
    dispatch(setServiceFormHide());
  };

  return (
    <ModalForm
      WrappedComponent={NewService}
      title={mode === "add" ? "Agregar Servicio" : "Actualizar Servicio"}
      visible={show}
      form={form}
      onOk={onOk}
      okText="Aceptar"
      onCancel={onCancel}
      cancelText={"Cancelar"}
      draggable={true}
      width={"25vw"}
    />
  );
};
