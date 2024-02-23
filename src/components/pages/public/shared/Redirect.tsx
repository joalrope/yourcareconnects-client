import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Row, Typography } from "antd";
import { setLoading } from "../../../../store/slices";

const { Title } = Typography;

export const Redirect = ({ url }: { url: string }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const urlSplit = url.split("/");
  const pathName = urlSplit[urlSplit.length - 1];

  useEffect(() => {
    dispatch(setLoading(true));
    window.location.replace(url);

    return () => {
      dispatch(setLoading(false));
    };
  }, [dispatch, url]);

  return (
    <Row
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        padding: 48,
      }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        {t(`Redirecting to`)} {t(`${pathName}`)}
      </Title>
    </Row>
  );
};
