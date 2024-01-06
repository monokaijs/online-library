import {Button, ConfigProvider, Layout, Typography} from "antd";
import styles from "./BookQuickView.module.scss";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {CloseOutlined, StarOutlined} from "@ant-design/icons";
import {setBookQuickViewOpened} from "@/redux/slices/app.slice";

export default function BookQuickView() {
  const dispatch = useAppDispatch();
  const {bookQuickViewOpened} = useAppSelector(state => state.app);
  return <Layout.Sider
    collapsed={!bookQuickViewOpened}
    collapsedWidth={0}
    width={'30%'}
    style={{
      minWidth: 480
    }}
  >
    <div className={styles.bookQuickView}>
      <a className={styles.closeBtn} onClick={() => {
        dispatch(setBookQuickViewOpened(false));
      }}>
        <CloseOutlined/>
      </a>
      <ConfigProvider
        theme={{
          token: {
            colorText: '#FFFFFF',
          },
          components: {
            Layout: {
              siderBg: '#111326'
            }
          }
        }}
      >
        <Typography.Title level={3} className={styles.title}>
          About the book
        </Typography.Title>
        <div className={styles.bookMeta}>
          <div
            className={styles.bookCover}
            style={{
              backgroundImage: `url('https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg')`,
            }}
          />
          <div className={styles.bookName}>
            <Typography.Text className={styles.text}>
              The Cut-Up Trilogy. Nova Express
            </Typography.Text>
          </div>
          <div className={styles.author}>
            <Typography.Text className={styles.text}>
              William Burroughs
            </Typography.Text>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.number}>
                195
              </div>
              <div className={styles.name}>
                Pages
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                195
              </div>
              <div className={styles.name}>
                Reviews
              </div>
            </div>
            <div className={styles.stat}>
              <div className={styles.number}>
                195
              </div>
              <div className={styles.name}>
                Ratings
              </div>
            </div>
          </div>
        </div>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          token: {
            controlHeightLG: 50
          },
        }}
      >
        <div className={styles.controlsWrapper}>
          <div className={styles.controls}>
            <Button type={'primary'} size={'large'} className={styles.btn}>
              Read
            </Button>
            <Button size={'large'} shape={'circle'} className={styles.btnFavorite}>
              <StarOutlined/>
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  </Layout.Sider>
}