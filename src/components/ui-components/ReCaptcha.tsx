import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const reCaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const ReCaptcha = ({
  setRecaptcha,
}: {
  setRecaptcha: Dispatch<SetStateAction<boolean>>;
}) => {
  const { language } = useSelector((state: RootState) => state.i18n);
  const [recaptchaLng, setRecaptchaLng] = useState<string>(
    language === "esES" ? "es" : "en"
  );
  const [recaptchaKey, setRecaptchaKey] = useState(0);
  const captchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setRecaptchaLng(language === "esES" ? "es" : "en");
    setRecaptchaKey((prevKey) => prevKey + 1);
    captchaRef.current?.reset();
  }, [language]);

  const onChangeRecaptcha = () => {
    setRecaptcha(true);
  };

  const recaptchaRestart = () => {
    setRecaptchaKey((prevKey) => prevKey + 1);
    setRecaptcha(false);
    captchaRef.current?.reset();
  };

  return (
    <ReCAPTCHA
      key={recaptchaKey}
      ref={captchaRef}
      sitekey={reCaptchaSiteKey}
      onChange={onChangeRecaptcha}
      onExpired={recaptchaRestart}
      hl={recaptchaLng}
    />
  );
};
