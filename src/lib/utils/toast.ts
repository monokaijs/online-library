import { message as messageAntd } from "antd";
export const toast = ({
  success,
  message,
}: {
  success?: boolean;
  message?: string;
}) => {
  if (message) {
    messageAntd[success ? "success" : "error"](message);
  }
};
