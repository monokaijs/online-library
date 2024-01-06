import {Layout} from "antd";
import styles from "./BookQuickView.module.scss";

export default function BookQuickView() {
  return <Layout.Sider
    className={styles.bookQuickView}
    collapsed
    collapsedWidth={0}
    width={'30%'}
    style={{
      minWidth: 480
    }}
  >
    sth in sider
  </Layout.Sider>
}