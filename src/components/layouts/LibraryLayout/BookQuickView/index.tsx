import {Button, ConfigProvider, Layout, Typography} from "antd";
import styles from "./BookQuickView.module.scss";
import {useAppDispatch, useAppSelector} from "@/redux/store";
import {CloseOutlined, StarOutlined} from "@ant-design/icons";
import {setQuickView} from "@/redux/slices/app.slice";

export default function BookQuickView() {
  const dispatch = useAppDispatch();
  const {quickView} = useAppSelector(state => state?.app);
  const book = quickView.selectedBook;
  return <Layout.Sider
    collapsed={!quickView.opened}
    collapsedWidth={0}
    width={'30%'}
    style={{
      minWidth: 480
    }}
  >
    <div className={styles.bookQuickView}>
      <a className={styles.closeBtn} onClick={() => {
        dispatch(setQuickView({
          opened: false,
        }));
      }}>
        <CloseOutlined/>
      </a>
      {book && (
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
                backgroundImage: `url('${book.volumeInfo.imageLinks?.thumbnail}')`
              }}
            />
            <div className={styles.bookName}>
              <Typography.Text className={styles.text}>
                {book.volumeInfo.title}
              </Typography.Text>
            </div>
            <div className={styles.author}>
              <Typography.Text className={styles.text}>
                {book.volumeInfo.authors?.join(', ') || "Unknown"}
              </Typography.Text>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.number}>
                  {book.volumeInfo.pageCount}
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
      )}
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