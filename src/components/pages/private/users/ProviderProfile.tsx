import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Rate, Row, Typography } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { getFilesService, getUserById } from "../../../../services";
import { useTranslation } from "react-i18next";
import { IUser } from "../../../../interface";
import { ProfileItem } from "./ProfileItem";
import { UploadDocs } from "../../../ui-components/UploadDocs";

const { Title } = Typography;

/*
serviceModality: Array (empty)
certificates: Array (empty)

biography: Soy desarrollador de aplicaciones"
faxNumber: ""

owner: ""
webUrl: ziCode
"

*/

export const ProviderProfile = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [provider, setProvider] = useState<IUser>();
  const [rate, setRate] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const {
        ok,
        result: { fileList },
      } = await getFilesService(String(id), "docs");

      console.log({ fileList });
      if (ok) {
        setFileList([...fileList]);
        setCertificatesCount(fileList.length);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserById(String(id));

      setProvider(response?.result);
      setRate(response?.result?.ratings?.value);
    };

    fetchData();
  }, [id]);

  const onRate = (value: number) => {
    setRate(value);
    console.log({ value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRemove = async (file: any) => {
    console.log("file", file);
  };

  return (
    <Row
      className="animate__animated animate__fadeIn animate__delay-0.3s"
      justify={"center"}
      style={{ padding: 24, width: "100%" }}
    >
      <Col xs={24} sm={24} lg={16}>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
          }}
        >
          <Title level={3} style={{ margin: "25px 0px" }}>
            {t(`{{fullname}} profile`, { fullname: provider?.fullname })}
          </Title>
        </Row>

        <Row>
          <Col
            lg={24}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 24,
              width: "100%",
            }}
          >
            <img
              src={provider?.pictures?.profile.image || "/images/user.png"}
              alt={`picture of ${provider?.fullname}`}
              width={150}
              style={{ borderRadius: 12, marginRight: 20 }}
            />
            <Rate
              allowHalf
              value={rate}
              defaultValue={provider?.ratings?.value}
              style={{ fontSize: 24 }}
              onChange={onRate}
            />
          </Col>

          <Col>
            <ProfileItem title="Names" value={String(provider?.names)} />
            <ProfileItem title="Last Name" value={String(provider?.lastName)} />
            {provider?.isAllowedViewData && (
              <ProfileItem title="Email" value={String(provider?.email)} />
            )}
            {provider?.isAllowedViewData && (
              <ProfileItem
                title="Phone number"
                value={String(provider?.phoneNumber)}
              />
            )}
            <ProfileItem title="Address" value={String(provider?.address)} />
            <ProfileItem title="Zip code" value={String(provider?.zipCode)} />
            <ProfileItem
              title="Biography"
              value={String(provider?.biography)}
            />
            <ProfileItem
              title="Services"
              value={String(
                provider?.services?.map(
                  (service) => ` ${service.split("|").pop()}`
                )
              )}
            />
            <ProfileItem
              title="Modality"
              value={String(provider?.serviceModality?.join(", "))}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 24, width: "100%" }}>
          <Col>
            <UploadDocs
              id={String(id)}
              fileType="docs"
              fileList={fileList}
              setFileList={setFileList}
              maxCount={certificatesCount}
              onRemove={onRemove}
              viewRemove={false}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
