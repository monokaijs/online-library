"use client";
import { usePathname, useRouter } from "next/navigation";
import { Card, Layout, Menu, Typography } from "antd";
import { KeyOutlined, LinkOutlined } from "@ant-design/icons";

export default function SecurityLayoutContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Layout>
      <Card className="security">
        <div style={{ paddingBottom: 24 }}>
          <Typography.Title>Bảo mật</Typography.Title>
          <Typography.Text>
            Các thiết lập bảo mật cho tài khoản của bạn...
          </Typography.Text>
        </div>
        <Menu
          style={{ marginLeft: -16, marginBottom: -21 }}
          mode={"horizontal"}
          defaultSelectedKeys={[pathname?.split("/")?.slice(-1)?.[0]]}
          items={[
            {
              key: "security",
              label: "Đổi mật khẩu",
              icon: <KeyOutlined />,
              onClick: () => router.push("/dashboard/security"),
            },
            {
              key: "connect-account",
              label: "Liên kết tài khoản",
              icon: <LinkOutlined />,
              onClick: () => router.push("/dashboard/security/connect-account"),
            },
          ]}
        />
      </Card>
      {props.children}
    </Layout>
  );
}
