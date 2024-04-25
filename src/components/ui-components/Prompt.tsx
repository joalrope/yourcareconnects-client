import { unstable_useBlocker as useBlocker } from "react-router-dom";

export const Prompt = ({
  when,
  message,
}: {
  when: boolean;
  message: string;
}) => {
  useBlocker(() => {
    if (when) {
      return !window.confirm(message);
    }
    return false;
  });

  return <div key={1} />;
};
