"use client";
import styles from "./styles.module.scss";
import {Button} from "antd";
import LogoMain from "@/assets/figures/logo-main.png";
import {Link as LinkS} from "react-scroll";
import {CloseOutlined, MenuFoldOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const navigationConfigsLandingPage = [
  {key: "home", title: "Trang chủ", path: "home"},
  {key: "introduction", title: "Về D Free Books", path: "introduction"},
  {key: "book", title: "Sách", path: "book"},
  {key: "activities", title: "Hoạt động", path: "activities"},
  {key: "contact", title: "Liên hệ", path: "contact"}
]

export default function MobileHeader() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img src={LogoMain.src} alt={"Logo"} className={styles.logo}/>
        <Button
          onClick={() => setIsCollapsed(true)}
          size="large" type="text"
          icon={<MenuFoldOutlined/>}/>
        <div style={{transform: `${isCollapsed ? "translateX(0px)" : "translateX(300px)"}`}} className={styles.navbar}>
          <div style={{marginLeft:-12}}>
            <img src={LogoMain.src} alt={"Logo"} className={styles.logo}/>
          </div>
          {navigationConfigsLandingPage.map(item => (
            <LinkS
              onClick={() => setIsCollapsed(false)}
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
          <Button
            onClick={() => router.push("/auth/login")}
            className={styles.loginButton}
            size="large"
            type="text">Đăng nhập</Button>
          <Button
            onClick={() => router.push("/auth/register")}
            className={styles.registerButton}
            size="large"
            type="primary">Đăng ký</Button>
          <Button
            className={styles.closeButton}
            onClick={() => setIsCollapsed(false)}
            type="text"
            icon={<CloseOutlined/>}/>
        </div>
        <div style={{display: `${isCollapsed ? "block" : "none"}`}} className={styles.overlay}/>
      </div>
    </div>
  )
}