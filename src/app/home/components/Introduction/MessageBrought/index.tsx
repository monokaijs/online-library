"use client";

import styles from "./styles.module.scss";
import {Col, Row, Typography} from "antd";
import {BookOutlined, EyeOutlined, HeartOutlined} from "@ant-design/icons";

const data = [
  {
    id: 1,
    icon: <EyeOutlined/>,
    title: "Tầm nhìn",
    description: "Trở thành một điểm đến quen thuộc với bạn đọc yêu sách tại Hà Nội và một nơi trung chuyển sách đến những nơi đang cần."
  },
  {
    id: 1,
    icon: <HeartOutlined/>,
    title: "Sứ mệnh",
    description: "Chữa lành cộng đồng bằng sự tử tế, lan tỏa văn hóa đọc"
  },
  {
    id: 1,
    icon: <BookOutlined/>,
    title: "Giá trị cốt lõi",
    description: "D Free Book có xuất phát điểm là một thư viện cộng đồng cho mượn sách miễn phí và đặt cọc niềm tin. Chúng mình là những người trẻ có một niềm tin mãnh liệt vào sự tử tế, tri thức cũng như những điều tốt đẹp trong cuộc sống. \n"
  }
]

export default function MessageBrought() {
  return (
    <div className="mt-10">
      <Typography.Title className="mb-2 text-center">Tầm nhìn & Sứ mệnh & Giá trị cốt lõi</Typography.Title>
      <Typography.Text className="text-center visible">Thông điệp chính mà D Free Book muốn mang lại</Typography.Text>
      <div className="mt-6 pb-10 ">
        <Row gutter={[24, 24]}>
          {data.map(item => (
            <Col xs={24} lg={8} key={item.id}>
              <div  className={styles.messageItem}>
                <div className={styles.icon}>
                  {item.icon}
                </div>
                <Typography.Title className="py-4 text-center">{item.title}</Typography.Title>
                <Typography.Paragraph className="text-center">{item.description}</Typography.Paragraph>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}