import {ReactNode} from "react";
import styles from "./layout.module.scss";
import {Card} from "antd";

interface BorrowsFormLayoutProps {
  children: ReactNode;
}

function BorrowsFormLayout(props: BorrowsFormLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Card>{props?.children}</Card>
    </div>
  );
}

export default BorrowsFormLayout;
