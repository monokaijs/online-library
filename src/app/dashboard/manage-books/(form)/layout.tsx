import {ReactNode} from "react";
import styles from "./layout.module.scss";
import {Card} from "antd";

interface BookFormLayoutProps {
  children: ReactNode;
}

function BookFormLayout(props: BookFormLayoutProps) {
  return (
    <div className={styles.wrapper}>
      {props?.children}
    </div>
  );
}

export default BookFormLayout;
