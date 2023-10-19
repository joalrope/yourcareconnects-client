import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import type { FormInstance } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
//import ImgCrop from "antd-img-crop";

interface Props {
  form: FormInstance;
  pictureName: string;
  fileList: UploadFile[];
  setFileList: Dispatch<SetStateAction<UploadFile[]>>;
}

export const ProfilePicture = ({
  form,
  pictureName,
  fileList,
  setFileList,
}: Props) => {
  //const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { t } = useTranslation();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    const fileUrl = file.url || (file.preview as string);
    setPreviewTitle(
      file.name || fileUrl.substring(fileUrl.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = async ({ fileList }) => {
    if (fileList.length === 0) {
      return;
    }

    form.setFieldValue(pictureName, fileList);

    setFileList(fileList);
  };

  /* const beforeUpload = (file: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList((prev) => [...prev, { url: reader.result }] as UploadFile[]);
    };

    if (fileList.length === 0) {
      return;
    }

    form.setFieldValue(pictureName, fileList);

    return false;
  };*/

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: () => {
      return false;
    },
    fileList,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ fontSize: 12, marginTop: 8 }}>{t("Select an image")}</div>
    </div>
  );

  return (
    <>
      {/*  <ImgCrop rotationSlider> */}
      <Upload
        accept="image/png, image/jpeg"
        name={pictureName}
        fileList={fileList}
        listType="picture-card"
        {...props}
        onPreview={handlePreview}
        onChange={handleChange}
        className="avatar-uploader"
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      {/*  </ImgCrop> */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image
          alt={`picture of ${pictureName}`}
          src={previewImage}
          preview={false}
        />
      </Modal>
    </>
  );
};

const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const baseUrl = import.meta.env.VITE_URL_BASE;

// eslint-disable-next-line react-refresh/only-export-components
export const handleUpload = async (
  fileList: UploadFile[],
  fileName: string
) => {
  //
  const formData = new FormData();

  formData.append("image", fileList[0].originFileObj as RcFile, fileName);

  const url = `${baseUrl}/api/uploads/profile/${fileName}`;

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "x-token": sessionStorage.token,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch(() => {
      console.error("An error occurred while loading the image.");
    });
};
