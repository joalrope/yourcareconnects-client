import { LoginForm } from "../../../../forms/LoginForm";
import "./login.css";

export const Login = () => {
  return (
    <div className="--login__container">
      <div className="--login__bg"></div>
      <div className="--login__form">
        <LoginForm />
      </div>
    </div>
  );
};
