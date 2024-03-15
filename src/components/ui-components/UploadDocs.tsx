import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { App, Button, Upload } from "antd";
import type { RcFile } from "antd/es/upload/interface";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const UploadDocs = () => {
  const { t } = useTranslation();
  const { message } = App.useApp();

  const onChange = async ({
    file,
    fileList,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileList: any[];
  }) => {
    if (file.status !== "uploading") {
      //console.log(file, fileList);
    }

    const formData = new FormData();

    if (fileList.length > 1) {
      formData.append("file", fileList[0].originFileObj as RcFile, file.name);
    }

    //const files = fileList.map((file) => {
    //  return file.originFileObj?.name;
    //});

    //console.log({ files });

    const url = `${baseUrl}/api/uploads/docs`;

    //console.log("fetching to upload");

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beforeUpload = (file: any) => {
    const isDocs =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isDocs) {
      message.error(`${file.name} is not a png file`);
    }

    return isDocs || Upload.LIST_IGNORE;
  };

  return (
    <Upload
      name="file"
      maxCount={5}
      listType="text"
      onChange={onChange}
      beforeUpload={beforeUpload}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        {t("Upload")}
      </Button>
    </Upload>
  );
};
