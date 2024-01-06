import {Layout} from "antd";
import styles from "./BookQuickView.module.scss";
import {useAppSelector} from "@/redux/store";

export default function BookQuickView() {
  const {bookQuickViewOpened} = useAppSelector(state => state.app);
  return <Layout.Sider
    className={styles.bookQuickView}
    collapsed={!bookQuickViewOpened}
    collapsedWidth={0}
    width={'30%'}
    style={{
      minWidth: 480
    }}
  >
    sth in sider
  </Layout.Sider>
}