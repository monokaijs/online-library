import styles from "@/components/pages/Home/SuggestedBooks/styles.module.scss";
import {Button, Card, Tag, theme, Typography} from "antd";
import {ArrowRightOutlined, CloseOutlined} from "@ant-design/icons";
import {useState} from "react";

export default function SuggestedBookItem() {
  const {token: {
    colorPrimary
  }} = theme.useToken();
  const [selected, setSelected] = useState(false);

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
          <Typography.Text className={styles.author}>
            Michael Foucalt
          </Typography.Text>
          <div className={styles.tags}>
            <Tag>
              Literature
            </Tag>
            <Tag>
              Science
            </Tag>
          </div>
        </div>
        <div className={styles.controls}>
          <Button type={!selected ? 'primary' : undefined} onClick={() => setSelected(!selected)}>
            {!selected ? <>
              Preview <ArrowRightOutlined/>
            </>: <>
              <CloseOutlined/> Close
            </>}
          </Button>
        </div>
      </div>
    </div>
  </Card>
}