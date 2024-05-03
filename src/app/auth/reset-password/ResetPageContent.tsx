"use client";
import { Typography } from "antd";
import styles from "./page.module.scss";
import ResetForm from "@/app/auth/reset-password/ResetForm";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPageContent({
  redirectUri,
}: {
  redirectUri: string;
}) {
  const router = useRouter();
  return (
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.meta}>
          <Typography.Title>Reset password</Typography.Title>
          <Typography.Paragraph>
            Enter the email adress associated with your account and we'll send
            you a link to reset password. Haven't got an account?{" "}
            <Link href={"/auth/register"}>Create your account now</Link>.
          </Typography.Paragraph>
        </div>

        <ResetForm
          redirectUri={redirectUri}
          onSuccess={() => {
            router.replace("/");
          }}
        />
      </div>
    </div>
  );
}
