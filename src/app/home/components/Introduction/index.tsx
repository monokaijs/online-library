"use client";

import { UserOutlined} from "@ant-design/icons";
import styles from "./styles.module.scss";
import {Typography} from "antd";
import {Book} from "@/components/icons/Book";
import {Quotes} from "@/components/icons/Quotes";
import MessageBrought from "@/app/home/components/Introduction/MessageBrought";

const introList = [
  {
    id: "1",
    tag: "Giới thiệu về thư viện",
    title: "D Free Book",
    description: [
      "D Free Book là một thư viện cộng đồng cho mượn sách miễn phí và đặt cọc niềm tin. Chúng mình có cơ sở Đại La và cơ sở Cầu Giấy, cả hai đều gần các trường đại học lớn. Bạn đọc của thư viện phần lớn là sinh viên, ngoài ra có người đi làm và học sinh.",
      "Qua hơn 6 năm hoạt động, D Free Book đã xây dựng được một cộng đồng yêu sách và ngày càng mở rộng kết nối với những người bạn cùng chung lý tưởng."
    ],
    icon: <Book/>,
    image: "/images/intro-1.svg"
  },
  {
    id: "2",
    tag: "Nhà sáng lập thư viện",
    title: "Nhà sáng lập D Free Book",
    description: ["D Free Book được thành lập năm 2017 bởi <strong>Hoàng Quý Bình</strong> - cựu sinh viên Đại học Bách khoa Hà Nội. Từ tủ sách cá nhân với 300 đầu sách của mình, Bình thu thập thêm nhiều đầu sách các loại cho các bạn cùng xóm trọ và quanh khu vực trường đến đọc. Và rồi, quyết định táo bạo nhất của anh là thành lập một thư viện cộng đồng với cơ sở đầu tiên đặt tại một khu tập thể trên phố Lê Thanh Nghị. Tri thức bắt đầu được lan tỏa như thế.\n"],
    icon: <UserOutlined/>,
    image: "/images/intro-2.svg"
  },
  {
    id: "3",
    tag: "Châm ngôn",
    title: "“Sách nằm im là sách chết”",
    description: [
      "Với quan niệm “Sách nằm im là sách chết” và một sự quyết tâm làm sống lại văn hóa đọc trong cuộc sống hiện đại, Bình đã rất cố gắng để kêu gọi các tổ chức cũng như tổ chức nhiều sự kiện để làm phong phú hơn về số lượng và chất lượng sách tại thư viện.",
      "Đến nay, sau một hành trình dài có sự đồng hành, chung sức của nhiều sự tử tế, thư viện đã có hai cơ sở ở Hà Nội với hơn 10,000 đầu sách - nơi mọi người ở mọi lứa tuổi có thể mượn sách hoàn toàn MIỄN PHÍ. D Free Book là thư viện 3 không: không đặt cọc, không thu phí và không giới hạn đối tượng."
    ],
    icon: <Quotes/>,
    image: "/images/intro-3.svg"
  }

];
export default function Introduction() {
  return (
    <div id="introduction" className="relative">
      <div className={`${styles.container}`}>
        {introList.map((item, index) => (
          <div
            style={{flexDirection: ((index + 1) % 2 !== 0) ? "row" : "row-reverse"}}
            key={item.id}
            className={`${styles.introItem}  md-flex-col`}>
            <div className={styles.image}>
              <img  src={item.image} alt="intro"/>
            </div>
            <div className={styles.info}>
              <div className={styles.tag}>
                {item.icon}
                <Typography.Text>{item.tag}</Typography.Text>
              </div>

              <Typography.Title className={styles.title}>{item.title}</Typography.Title>
              <div>
                {item.description.map(item => (
                  <div className={styles.description} dangerouslySetInnerHTML={{__html: item}}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <MessageBrought/>
      </div>
      <div className="lg-hidden">
        <img className={styles.spreadOne} src="/images/spread-1.svg" alt=""/>
        <img className={styles.spreadTwo} src="/images/spread-2.svg" alt=""/>
        <img className={styles.spreadThree} src="/images/spread-3.svg" alt=""/>
      </div>
    </div>
  )
}