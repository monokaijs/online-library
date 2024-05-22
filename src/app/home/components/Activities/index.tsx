"use client";

import styles from "./styles.module.scss";
import {Col, Row, Typography} from "antd";
import {BookOutlined, EyeOutlined, HeartOutlined} from "@ant-design/icons";


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
  {
    id: 4,
   icon: "/images/activity-4.svg",
    title: "Tặng cây chào tân sinh viên",
    description: "Chào đón các tân sinh viên với món quà đặc biệt - một cây xanh nhỏ để bạn mang đến một khởi đầu mới tươi mát và ý nghĩa."
  },
  {
    id: 5,
   icon: "/images/activity-5.svg",
    title: "Tặng sách",
    description: "D Free Book tổ chức các chương trình tặng sách miễn phí cho cộng đồng, giúp lan tỏa tri thức và niềm đam mê đọc sách."
  },
  {
    id: 6,
   icon: "/images/activity-6.svg",
    title: "Chuyến đi tỉnh xa xây dựng tủ sách",
    description: "Thực hiện các chuyến đi thiện nguyện đến những vùng xa, xây dựng tủ sách và mang tri thức đến với trẻ em ở những nơi khó khăn."
  }
]


export default function Activities() {
  return (
    <div id="activities" className={styles.wrapper}>
      <div className={styles.container}>
        <div>
          <Typography.Title className="mb-2 text-center">Hoạt động</Typography.Title>
          <Typography.Text className="text-center visible">
            Các hoạt động sôi nổi diễn ra tại D Free Book
          </Typography.Text>
        </div>
        <div className="mt-6 pb-10 ">
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
    </div>
  )
}