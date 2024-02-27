import {ReactNode} from "react";
import styles from "./layout.module.scss";
import {Card} from "antd";

interface BookshelfFormLayoutProps {
  children: ReactNode;
}

function BookshelfFormLayout(props: BookshelfFormLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Card>{props?.children}</Card>
    </div>
  );
}

export default BookshelfFormLayout;
