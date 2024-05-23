"use client";
import {Typography} from "antd";
import styles from "./page.module.scss";
import Link from "next/link";
import RegisterForm from "@/app/auth/register/RegisterForm";

export default function RegisterPageContent() {
  return <div className={styles.content}>
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <Typography.Title>
          Đăng ký tài khoản
        </Typography.Title>
        <Typography.Paragraph>
          Đã có tài khoản? <Link href={'/auth/login'}>Đăng nhập</Link>.
        </Typography.Paragraph>
      </div>

      <RegisterForm/>
    </div>
  </div>
}
