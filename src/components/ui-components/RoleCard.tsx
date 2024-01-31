import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Image, theme } from "antd";
import { RootState } from "../../store";
import { setRole } from "../../store/slices";

const { useToken } = theme;

const RoleCard = ({ role }: { role: string }) => {
  const dispatch = useDispatch();
  const { token } = useToken();
  const { language } = useSelector((state: RootState) => state.i18n);
  const [curRole, setCurRole] = useState<string>();

  useEffect(() => {
    if (language === "esES" && role === "customer") {
      setCurRole("Usuarios");
    }

    if (language === "enUS" && role === "customer") {
      setCurRole("Users");
    }

    if (language === "esES" && role === "provider") {
      setCurRole("Proveedores");
    }

    if (language === "enUS" && role === "provider") {
      setCurRole("Providers");
    }
  }, [language, role]);

  const backgroundColor = role === "customer" ? token.colorPrimary : "#4762EE";
  const color = role === "customer" ? token.colorWhite : "white";
  const image = role === "customer" ? "/images/woman.png" : "/images/man.png";

  const setSelectedRole = () => {
    dispatch(setRole(role));
  };

  return (
    <Link
      to={role === "customer" ? "/register/customer" : "/register/provider"}
      onClick={setSelectedRole}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor,
          borderRadius: 8,
          color,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: 180,
          userSelect: "none",
          width: 180,
        }}
      >
        <div style={{ height: "66%", marginBottom: "10%", padding: 24 }}>
          <Image src={image} preview={false} width={80} />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>{curRole}</h3>
      </div>
    </Link>
  );
};

export default RoleCard;
