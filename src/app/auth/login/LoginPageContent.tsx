"use client";
import {Typography} from "antd";
import styles from "./page.module.scss";
import LoginForm from "@/app/auth/login/LoginForm";
import Link from "next/link";

export default function LoginPageContent() {
  return <div className={styles.content}>
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <Typography.Title>
          Login
        </Typography.Title>
        <Typography.Paragraph>
          Sign in to explore the biggest free library on the world. Haven't got an account? <Link href={'/auth/register'}>Create your account now</Link>.
        </Typography.Paragraph>
      </div>

      <LoginForm/>
    </div>
  </div>
}
