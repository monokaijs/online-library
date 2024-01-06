import styles from "@/components/pages/Home/SuggestedBooks/styles.module.scss";
import {Card, Tag, theme, Typography} from "antd";

export default function SuggestedBookItem() {
  const {token: {
    colorPrimary
  }} = theme.useToken();
  return <Card
    bordered={false}
  >
    <div className={styles.item}>
      <div className={styles.figure}>
        <div className={styles.ghosting} style={{
          backgroundColor: colorPrimary
        }}></div>
        <div
          className={styles.artwork}
          style={{
            backgroundImage: `url('https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg')`
          }}
        ></div>
      </div>
      <div className={styles.metadata}>
        <div className={styles.info}>
          <Typography.Title level={5} className={styles.title}>
            The Birth of the Clinics
          </Typography.Title>
          <Typography.Text>
            Michael Foucalt
          </Typography.Text>
        </div>
        <div className={styles.tags}>
          <Tag>
            Literature
          </Tag>
          <Tag>
            Science
          </Tag>
        </div>
      </div>
    </div>
  </Card>
}