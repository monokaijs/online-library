import {Card, Col, Row, Tag, theme, Typography} from "antd";
import styles from "./styles.module.scss";
import {useEffect, useRef, useState} from "react";
import SuggestedBookItem from "@/components/pages/Home/SuggestedBooks/SuggestedBookItem";
import SectionTitle from "@/components/shared/SectionTitle";

export default function SuggestedBooks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=agatha christie`).then(r => r.json()).then(response => {
      const items = response.items;
      setBooks(items);
    })
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const rect = entry.contentRect;
          if (rect.width < 1600 && rect.width >= 1200) {
            setItemsPerRow(3);
          } else if (rect.width < 1200 && rect.width >= 920) {
            setItemsPerRow(2);
          } else if (rect.width < 920) {
            setItemsPerRow(1);
          } else {
            setItemsPerRow(4);
          }
        }
      });

      resizeObserver.observe(containerRef.current);
    }
  }, [containerRef]);

  return <>
    <SectionTitle
      title={'New books'}
    />
    <div className={styles.cards} ref={containerRef}>
      <Row gutter={[24, 24]}>
        {books.map(book => (
          <Col xs={24/itemsPerRow}>
            <SuggestedBookItem book={book} key={book.id}/>
          </Col>
        ))}
      </Row>
    </div>
  </>
}