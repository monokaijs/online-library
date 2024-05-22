"use client";

import styles from "./styles.module.scss";
import {Col, Row, Typography} from "antd";
import {partnersOne, partnersTwo} from "./data";

const activities = [
  {
    id: 1,
    icon: "/images/activity-1.svg",
    title: "Mượn sách miễn phí",
    description: "Tận hưởng kho sách phong phú tại D Free Book hoàn toàn miễn phí. Bạn có thể mượn và đọc sách mà không tốn bất kỳ chi phí nào."
  },
  {
    id: 2,
    icon: "/images/activity-2.svg",
    title: "Các buổi Workshop",
    description: "Tham gia các buổi workshop thú vị về sách, viết lách, và nhiều chủ đề hấp dẫn khác. Học hỏi và kết nối với những người có cùng đam mê."
  },
  {
    id: 3,
    icon: "/images/activity-3.svg",
    title: "Đổi sách lấy cây",
    description: "Tham gia chương trình đổi sách cũ lấy cây xanh. Góp phần bảo vệ môi trường của bạn bằng những cây xanh."
  },
]


export default function PartnersAndCommunications() {
  return (
    <div className={styles.wrapper}>
      <div>
        <Typography.Title className="mb-2 text-center">Đối tác & Truyền thông</Typography.Title>
        <Typography.Text className="text-center visible">
          Hợp tác với hơn 17+ doanh nghiệp, câu lạc bộ,...
        </Typography.Text>
      </div>
      <div className="mt-16 flex flex-col gap-12 overflow-hidden pb-1">
        <div className="group flex gap-5">
          <div className="flex animate-loop-scroll gap-12">
            {partnersOne.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <img src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
          <div className="flex animate-loop-scroll gap-12" aria-hidden="true">
            {partnersOne.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <img src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
        </div>
        <div className="group flex gap-12">
          <div className="flex animate-loop-scroll-right gap-12">
            {partnersTwo.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <img src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
          <div className="flex animate-loop-scroll-right gap-12" aria-hidden="true">
            {partnersTwo.map(item => (
              <div key={item.id} className={styles.partnerItem}>
                <img src={item.image} alt="activity"/>
                <Typography.Text>{item.name}</Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.communicationWrapper}>
        <Row gutter={[24, 24]}>
          {activities.map(item => (
            <Col xs={24} md={12} lg={8} key={item.id}>
              <div className={styles.activityItem}>
                <img src={item.icon} alt="activity"/>
                <Typography.Title level={4} className="py-4 text-center">{item.title}</Typography.Title>
                <Typography.Paragraph className="text-center">{item.description}</Typography.Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}