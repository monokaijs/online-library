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
          Create Account
        </Typography.Title>
        <Typography.Paragraph>
          Already got an account? <Link href={'/auth/login'}>Sign in now</Link>.
        </Typography.Paragraph>
      </div>

      <RegisterForm/>
    </div>
  </div>
}
