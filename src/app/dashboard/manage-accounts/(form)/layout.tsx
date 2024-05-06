import { ReactNode } from "react";
import { Card } from "antd";
import styles from "./layout.module.scss";

interface AccountFormLayoutProps {
  children: ReactNode;
}

export default function AccountFormLayout(props: AccountFormLayoutProps) {
  return props?.children;
}
