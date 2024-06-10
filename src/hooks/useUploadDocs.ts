import { App, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload/interface";

const baseUrl = import.meta.env.VITE_URL_BASE;

export const useUploadDocs = () => {
  const { message } = App.useApp();

  const uploadDocs: UploadProps = {
    name: "file",
    maxCount: 5,
    listType: "text",

    async onChange({ file, fileList }) {
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

      const url = `${baseUrl}/api/uploads`;

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
    },
    beforeUpload(file) {
      const isDocs =
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      if (!isDocs) {
        message.error(`${file.name} is not a png file`);
      }

      return isDocs || Upload.LIST_IGNORE;
    },
  };

  return uploadDocs;
};
