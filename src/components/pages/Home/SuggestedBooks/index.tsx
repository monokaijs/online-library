import {Card, Col, Row, Tag, theme, Typography} from "antd";
import styles from "./styles.module.scss";
import {useEffect, useRef, useState} from "react";
import SuggestedBookItem from "@/components/pages/Home/SuggestedBooks/SuggestedBookItem";

export default function SuggestedBooks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          const rect = entry.contentRect;
          if (rect.width < 1600 && rect.width >= 1000) {
            setItemsPerRow(3);
          } else if (rect.width < 1000 && rect.width >= 600) {
            console.log('ok');
            setItemsPerRow(2);
          } else if (rect.width < 600) {
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
    <Typography.Title level={4}>
      New books
    </Typography.Title>
    <div className={styles.cards} ref={containerRef}>
      <Row gutter={[24, 24]}>
        <Col xs={24/itemsPerRow}>
          <SuggestedBookItem/>
        </Col>
        <Col xs={24 / itemsPerRow}>
          <SuggestedBookItem/>
        </Col>
        <Col xs={24 / itemsPerRow}>
          <SuggestedBookItem/>
        </Col>
        <Col xs={24 / itemsPerRow}>
          <SuggestedBookItem/>
        </Col>
      </Row>
    </div>
  </>
}