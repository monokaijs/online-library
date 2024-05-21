"use client";
import styles from "./styles.module.scss";
import {Button, Typography} from "antd";
import LogoMain from "@/assets/figures/logo-main.png";

const navigationConfigs = [
  {key: "home", title: "Trang chủ", path: "#"},
  {key: "introduction", title: "Về D Free Books", path: "#"},
  {key: "book", title: "Sách", path: "#"},
  {key: "activities", title: "Hoạt động", path: "#"},
  {key: "contact", title: "Liên hệ", path: "#"}
]

export default function LandingPageHeader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={LogoMain.src} alt={"Logo"} className={styles.logo}/>
        <div className={styles.navbar}>
          {navigationConfigs.map(item => (
            <Typography.Text key={item.key}>{item.title}</Typography.Text>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <Button className={styles.loginButton} size="large" type="text">Đăng nhập</Button>
          <Button className={styles.registerButton} size="large" type="primary">Đăng ký</Button>
        </div>
      </div>
    </div>
  )
}