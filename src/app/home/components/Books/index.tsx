"use client";

import styles from "./styles.module.scss";
import {Col, Rate, Row, Typography} from "antd";
import "./customize-rate.scss";
import {favoriteBooks, newPublishBooks} from "@/app/home/components/Books/data";

export default function Books() {
  return (
    <div id="books" className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <Typography.Title className="mb-2 text-center">Sách được ưa thích </Typography.Title>
          <Typography.Text className="text-center visible">Chúng tôi đã có hơn 50+ thể loại sách tại thư viện D
            Free</Typography.Text>
          <div className="mt-8">
            <Row gutter={[40, 40]}>
              {favoriteBooks.map(item => (
                <Col key={item.id} xs={24} lg={12}>
                  <div className={styles.favoriteBookItem}>
                    <div className={styles.image}>
                      <img src={item.picture} alt="book"/>
                    </div>
                    <div className={styles.info}>
                      <Typography.Title level={4} className="two-line-text ">{item.name}</Typography.Title>
                      <Typography.Text className={styles.author}>Tác giả: {item.authorName}</Typography.Text>
                      <div className={`${styles.rate} customize-rate`}>
                        <Rate disabled allowHalf defaultValue={item.star}/>
                        <Typography.Text
                          className={styles.rateCount}>{(item.rateCount / 1000).toFixed(3).replace(".", ",")} đánh
                          giá</Typography.Text>
                      </div>
                      <Typography.Paragraph className={styles.description}>{item.description}</Typography.Paragraph>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className={styles.newPublishBooks}>
            <Typography.Title className="mb-2 text-center">Sách mới xuất bản</Typography.Title>
            <Typography.Text className="text-center visible">
              Những cuốn sách đều được cập nhật mới theo ngày
            </Typography.Text>
            <div style={{gap: 53}} className="mt-16 w-full flex flex-wrap justify-center">
              {newPublishBooks.map(item => (
                <div key={item.id}>
                  <div className={styles.newPublishItem}>
                    <div className={styles.image}>
                      <img src={item.picture} alt="book"/>
                    </div>
                    <Typography.Title level={4} className="two-line-text">{item.name}</Typography.Title>
                    <Typography.Text className={styles.author}>{item.authorName}</Typography.Text>
                    <Rate disabled className="customize-rate" allowHalf defaultValue={item.star}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg-hidden">
        <img className={styles.spreadOne} src="/images/spread-4.svg" alt="spread"/>
        <img className={styles.spreadTwo} src="/images/spread-5.svg" alt="spread"/>
        <img className={styles.spreadThree} src="/images/spread-6.svg" alt="spread"/>
        <img className={styles.spreadFour} src="/images/spread-7.svg" alt="spread"/>
      </div>
    </div>
  )
}