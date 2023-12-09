import { useState } from "react";
import ImgCrop from "antd-img-crop";
import { FormInstance, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import "./user-profile-image.css";

interface Props {
  form: FormInstance;
}

export const UserProfileImage = ({ form }: Props) => {
  const { pictures } = useSelector((state: RootState) => state.user);

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      url: `${pictures?.profile.image}`
        ? `${pictures?.profile.image}`
        : "/images/user.png",
      name: `${pictures?.profile.name}`,
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      file.status = "done";
    }

    if (!file) {
      form.setFieldValue("pictures", {
        profile: {
          name: "",
          type: "",
          image: "",
        },
      });
      setFileList(fileList);
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file.originFileObj as RcFile);
    reader.onload = (e) => {
      form.setFieldValue("pictures", {
        profile: {
          name: file.name,
          type: file.type,
          image: e.target?.result,
        },
      });
    };
    setFileList(fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = (e) => {
          console.log({ base64: e.target?.result });
          resolve(reader.result as string);
        };
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};
