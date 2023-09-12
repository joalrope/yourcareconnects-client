import { useRef, useState } from "react";
import { Col, FormInstance, Image, Modal } from "antd";
import Draggable from "react-draggable";
import type { DraggableData, DraggableEvent } from "react-draggable";
import logo from "/images/logo.png";
import "./modal-form.css";

interface Props {
  WrappedComponent: React.ElementType;
  form: FormInstance;
  title: string;
  visible: boolean;
  onOk: () => void;
  okText: string;
  onCancel: () => void;
  cancelText: string;
  draggable?: boolean;
  width: number | string;
}

export const ModalForm = ({
  WrappedComponent,
  form,
  title,
  visible,
  onOk,
  okText,
  onCancel,
  cancelText,
  draggable,
  width,
}: Props) => {
  // const [form] = Form.useForm();
  const draggleRef = useRef<HTMLDivElement>(null);
  const [disable, setDisable] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  let modalTitle = null;

  if (draggable) {
    modalTitle = (
      <div
        className="--form-modal__title-container"
        style={{
          width: "100%",
          cursor: "move",
        }}
        onMouseOver={() => {
          if (disable) {
            setDisable(!disable);
          }
        }}
        onMouseOut={() => {
          setDisable(true);
        }}
        // onFocus={() => {}}
        //onBlur={() => {}}
      >
        <div className="--form-modal__title-logo">
          <Image src={logo} alt={"Logo Tractocenter"} height={28} />
        </div>
        <Col xs={0} md={12} className="--form-modal__title-value">
          {title}
        </Col>
      </div>
    );
  } else {
    if (typeof title === "string") {
      modalTitle = (
        <div className="--form-modal__title-container">
          <div className="--form-modal__title-logo">
            <Image src={logo} alt={"Logo Tractocenter"} height={28} />
          </div>
          <div className="--form-modal__title-value">{title}</div>
        </div>
      );
    }
  }

  //const nodeRef = createRef();

  return (
    <Modal
      className="--form-modal__container"
      width={width}
      open={visible}
      title={modalTitle}
      okText={okText}
      cancelText={cancelText}
      onCancel={() => onCancel()}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            onOk();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      modalRender={(modal) => (
        <Draggable
          nodeRef={draggleRef}
          disabled={disable}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div className="--form-modal__draggable" ref={draggleRef}>
            {modal}
          </div>
        </Draggable>
      )}
    >
      <WrappedComponent form={form} />
    </Modal>
  );
};
