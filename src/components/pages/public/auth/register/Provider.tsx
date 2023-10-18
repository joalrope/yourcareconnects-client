import { ProviderForm } from "../../../../forms/auth/provicer-form/ProviderForm";
import "./register.css";

export const Provider = () => {
  return (
    <div className="--provider__container">
      <div className="--provider__form">
        <ProviderForm />
      </div>
    </div>
  );
};
