"use client";
import {Typography} from "antd";
import styles from "./page.module.scss";
import LoginForm from "@/app/auth/login/LoginForm";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function LoginPageContent({redirectUri}: {redirectUri:string}) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const mobile = params.get('is_mobile');
    // is mobile
    setIsMobile(mobile === 'true' || mobile === '1');
  }, []);

  return <div className={styles.content}>
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <Typography.Title>
          Đăng nhập
        </Typography.Title>
        <Typography.Paragraph>
          Đăng nhập để khám phá thư viện miễn phí. Chưa có tài khoản? <Link href={'/auth/register'}>Bạn có thể tạo ở đây</Link>.
        </Typography.Paragraph>
      </div>

      <LoginForm redirectUri={redirectUri} onSuccess={async () => {
        if (isMobile) {
          const redirectUri = params.get('redirect_uri');
          if (redirectUri) {
            const response = await fetch('/api/session').then(r => r.json());
            const cookies = response.data;
            location.href = `${redirectUri}#${encodeURIComponent(cookies)}`;
          }
        }
        router.replace('/');
      }}/>
    </div>
  </div>
}
