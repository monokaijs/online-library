import {ReactNode} from "react";
import styles from "./layout.module.scss";
import {Card} from "antd";

interface BookcaseFormLayoutProps {
  children: ReactNode;
}

function BookcaseFormLayout(props: BookcaseFormLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Card>{props?.children}</Card>
    </div>
  );
}

export default BookcaseFormLayout;
