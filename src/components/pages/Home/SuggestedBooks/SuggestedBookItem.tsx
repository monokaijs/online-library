import styles from "@/components/pages/Home/SuggestedBooks/styles.module.scss";
import {Button, Card, Tag, theme, Typography} from "antd";
import {ArrowRightOutlined, CloseOutlined} from "@ant-design/icons";
import {useState} from "react";
import {setQuickView} from "@/redux/slices/app.slice";
import {useAppDispatch, useAppSelector} from "@/redux/store";

export default function SuggestedBookItem({book}: any) {
  const {token: {
    colorPrimary
  }} = theme.useToken();
  const {quickView} = useAppSelector(state => state.app);
  const selected = quickView.selectedBook?.id === book.id;
  const dispatch = useAppDispatch();

  return <Card
    bordered={false}
    style={{
      borderRadius: 32
    }}
  >
    <div className={styles.item}>
      <div className={styles.figure}>
        <div className={styles.ghosting} style={{
          backgroundColor: colorPrimary
        }}></div>
        <div
          className={styles.artwork}
          style={{
            backgroundImage: `url('${book.volumeInfo.imageLinks?.thumbnail}')`
          }}
        ></div>
      </div>
      <div className={styles.metadata}>
        <div className={styles.info}>
          <Typography.Title level={5} className={styles.title}>
            {book.volumeInfo.title}
          </Typography.Title>
          <Typography.Text className={styles.author}>
            {book.volumeInfo?.authors?.join(', ') || 'Unknown'}
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
          <Button type={!selected ? 'primary' : undefined} onClick={() => {
            dispatch(setQuickView({
              opened: true,
              selectedBook: book,
            }));
          }}>
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