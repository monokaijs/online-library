"use client";
import styles from "./styles.module.scss";
import {Button} from "antd";
import LogoMain from "@/assets/figures/logo-main.png";
import { Link as LinkS } from "react-scroll";

export const navigationConfigsLandingPage = [
  {key: "home", title: "Trang chủ", path: "home"},
  {key: "introduction", title: "Về D Free Books", path: "introduction"},
  {key: "book", title: "Sách", path: "book"},
  {key: "activities", title: "Hoạt động", path: "activities"},
  {key: "contact", title: "Liên hệ", path: "contact"}
]

export default function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={LogoMain.src} alt={"Logo"} className={styles.logo}/>
        <div className={styles.navbar}>
          {navigationConfigsLandingPage.map(item => (
            <LinkS
              key={item.key}
              activeClass={styles.active}
              to={item.path}
              spy
              smooth
              offset={-84}
              duration={500}
            >
              {item.title}
            </LinkS>
          ))}
        </div>
        <div className="flex items-center gap-8 xl-mr-3">
          <Button className={styles.loginButton} size="large" type="text">Đăng nhập</Button>
          <Button className={styles.registerButton} size="large" type="primary">Đăng ký</Button>
        </div>
      </div>
    </div>
  )
}