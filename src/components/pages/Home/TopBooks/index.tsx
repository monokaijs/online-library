import SectionTitle from "@/components/shared/SectionTitle";
import styles from "./styles.module.scss";
import {Button, Typography} from "antd";
import {StarOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useAppDispatch} from "@/redux/store";
import {setBookQuickViewOpened} from "@/redux/slices/app.slice";

function BookItem({book}: any) {
  if (!book.volumeInfo.imageLinks?.thumbnail) return <></>;
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(false);
  return <div
    className={`${styles.item} ${selected ? styles.selected : styles.notSelected}`}
    onClick={() => {
      setSelected(!selected);
      dispatch(setBookQuickViewOpened(true));
    }}
  >
    <div
      className={styles.cover}
      style={{
        backgroundImage: `url('${book.volumeInfo.imageLinks?.thumbnail}')`
      }}
    >
      <Button shape={'circle'} className={styles.favoriteBtn} type={'text'}>
        <StarOutlined/>
      </Button>
    </div>
    <div className={styles.metadata}>
      <Typography.Text className={styles.title}>
        {book.volumeInfo.title}
      </Typography.Text>
      <Typography.Text className={styles.author}>
        {book.volumeInfo.authors?.[0]}
      </Typography.Text>
    </div>
  </div>
}

export default function TopBooks() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=o%27reilly`).then(r => r.json()).then(response => {
      const items = response.items;
      setBooks(items);
    })
  }, []);
  return <div className={styles.topBooks}>
    <SectionTitle
      title={'Top books'}
    />
    <div className={styles.horizontalList}>
      {books.map(book => (
        <BookItem book={book} key={book.id}/>
      ))}
    </div>
  </div>
}