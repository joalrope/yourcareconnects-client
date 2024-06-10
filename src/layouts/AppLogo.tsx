import { Col, Image, theme } from "antd";
import styles from "./layout.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const { useToken } = theme;

export const AppLogo = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { collapsed } = useSelector((state: RootState) => state.router);
  const { token } = useToken();

  return (
    <Link to={isLoggedIn ? "/dashboard" : "/login"}>
      <Col
        xs={0}
        className={styles.logoContainer}
        style={{
          backgroundColor: token.colorPrimary,
          maxWidth: collapsed ? 80 : 200,
        }}
      >
        <Image
          src={collapsed ? "/images/logo-tiny.png" : "/images/logo.png"}
          preview={false}
          width={collapsed ? 60 : 120}
        />
      </Col>
    </Link>
  );
};
