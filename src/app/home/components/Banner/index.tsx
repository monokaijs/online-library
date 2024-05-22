"use client";

import styles from "./styles.module.scss";
import {Image, Typography} from "antd";
import {BookOpenCover} from "@/components/icons/BookOpenCover";

export default function Banner() {
  return (
    <div id="home">
      <div className={styles.background}>
        <div className={`${styles.container} flex lg:flex-col flex-row`}>
          <div className={styles.contentLeft}>
            <div className={styles.box}>
              <BookOpenCover/>
              <Typography.Text>Mượn sách miễn phí trực tiếp và online</Typography.Text>
            </div>
            <Typography.Title className={styles.title}>Thư viện cộng đồng cho mượn sách miễn phí</Typography.Title>
            <p className={styles.description}>Chào mừng bạn đến với D Free - Thư viện sách độc đáo cho phép bạn mượn
              sách trực tuyến và trực tiếp tại
              thư
              viện. Khám phá hàng ngàn đầu sách thuộc nhiều thể loại khác nhau và tận hưởng niềm đam mê đọc sách bất cứ
              lúc nào, bất cứ nơi đâu.
            </p>
            <a href="#" className={styles.registerButton}>Đăng ký</a>
          </div>
          <div className={styles.contentRight}>
            <img
              src="/images/bibliophile-bro.svg"
              alt=""
            />
            <Typography.Text>“Mỗi trang sách là một chuyến phiêu lưu mới”</Typography.Text>
          </div>
        </div>
      </div>
    </div>
  )
}