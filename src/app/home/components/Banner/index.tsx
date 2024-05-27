"use client";

import styles from "./styles.module.scss";
import {Typography} from "antd";
import {BookOpenCover} from "@/components/icons/BookOpenCover";
import Link from "next/link";
import {useContext} from "react";
import {SessionContext} from "@/components/shared/SessionContext";

export default function Banner() {
  const { signedIn} = useContext(SessionContext);

  return (
    <div id="home">
      <div className={styles.background}>
        <img src="/images/group-dot.svg" alt={"dot"} className={`${styles.groupDot} xl-hidden`}/>
        <div className={`${styles.container}`}>
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
            <Link href={signedIn ? "/dashboard" : "/auth/register"} className={styles.registerButton}>Đăng ký</Link>
          </div>
          <div className={`${styles.contentRight} xl-hidden`}>
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