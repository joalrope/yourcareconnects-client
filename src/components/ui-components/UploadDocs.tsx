import { useState } from "react";
import { useTranslation } from "react-i18next";
import { App, Modal, Row, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
//import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64 } from "../../helpers/base64";

const baseUrl = import.meta.env.VITE_URL_BASE;

type fileType = "docs" | "images";

interface Props {
  id: string;
  fileType: fileType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFileList: any;
  fileList: UploadFile[];
  maxCount: number;
  viewRemove?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRemove?: (file: any) => void;
}

export const UploadDocs = ({
  id,
  fileType,
  fileList,
  setFileList,
  maxCount,
  viewRemove = true,
  onRemove,
}: Props) => {
  const { t } = useTranslation();
  const { message } = App.useApp();
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beforeUpload = (file: UploadFile) => {
    let isValidFile = false;

    if (fileList.length >= maxCount) {
      message.error({
        content: t("The maximum number of files allowed has been exceeded"),
        duration: 4,
        style: {
          marginTop: "40vh",
        },
      });
      return Upload.LIST_IGNORE;
    }

    if (fileType === "docs") {
      isValidFile = file.type === "application/pdf";

      if (!isValidFile) {
        message.error({
          content: t(`{{name}} is not a valid document file`, {
            name: file.name,
          }),
          duration: 4,
          style: {
            marginTop: "40vh",
          },
        });
      }

      return isValidFile || Upload.LIST_IGNORE;
    }

    if (fileType === "images") {
      isValidFile =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";

      if (!isValidFile) {
        message.error(`${file.name} is not a valid document file`);
      }

      return isValidFile || Upload.LIST_IGNORE;
    }
  };

  const onChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
    setFileList(info.fileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const onDownload = async (file: UploadFile) => {
    const urlPdf = `${baseUrl}/api/uploads/docs/${id}/${file.name}`;

    const response = await fetch(urlPdf, {
      method: "GET",
      headers: {
        "x-token": sessionStorage.token,
        responseType: "application/pdf",
      },
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(
      new Blob([blob], { type: "application/pdf" })
    );

    window.open(url);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewOpen(false);

  return (
    <Row style={{ justifyContent: "center", width: "100%" }}>
      <Upload
        name="file"
        multiple
        action={`${baseUrl}/api/uploads/files`}
        headers={{
          "x-token": sessionStorage.token,
        }}
        maxCount={maxCount}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        showUploadList={{
          showDownloadIcon: true,
          showPreviewIcon: fileType === "images" ? true : false,
          showRemoveIcon: viewRemove ? true : false,
        }}
        onRemove={onRemove}
        onChange={onChange}
        onPreview={handlePreview}
        onDownload={onDownload}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      {fileType === "images" && (
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      )}
    </Row>
  );
};
