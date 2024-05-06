"use client";
import styles from "./layout.module.scss";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Typography,
} from "antd";
import {
  BarChartOutlined,
  BellOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  RetweetOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  UserOutlined,
  BookOutlined,
} from "@ant-design/icons";
import LogoMain from "@/assets/figures/logo-main.png";
import Link from "next/link";
import { useContext } from "react";
import { SessionContext } from "@/components/shared/SessionContext";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayoutContent(props: any) {
  const { account } = useContext(SessionContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Layout className={styles.dashboardLayout}>
      <Layout.Sider width={230} className={styles.sider}>
        <div className={styles.siderContent}>
          <img src={LogoMain.src} alt={"Logo"} className={styles.logo} />
          <Menu
            mode={"inline"}
            className={styles.menu}
            items={[
              {
                key: "dashboard",
                icon: <BarChartOutlined />,
                label: <Link href={"/"}>Trang chủ</Link>,
              },
              {
                key: "home",
                icon: <HomeOutlined />,
                label: (
                  <Link href={"/dashboard/manage-locations"}>Quản lý thư viện</Link>
                ),
              },
              {
                key: "bookcases",
                icon: <TableOutlined />,
                label: (
                  <Link href={"/dashboard/manage-bookcases"}>
                    Quản lý tủ sách
                  </Link>
                ),
              },
              {
                key: "books",
                icon: <BookOutlined />,
                label: (
                  <Link href={"/dashboard/manage-books"}>Quản lý sách</Link>
                ),
              },
              {
                key: "accounts",
                icon: <SolutionOutlined />,
                label: (
                  <Link href={"/dashboard/manage-accounts"}>
                    Quản lý người dùng
                  </Link>
                ),
              },
              {
                key: "borrows-returns",
                icon: <RetweetOutlined />,
                label: (
                  <Link href={"/dashboard/manage-borrows"}>
                    Mượn - trả sách
                  </Link>
                ),
              },
              {
                key: "settings",
                icon: <SettingOutlined />,
                label: `Thiết lập`,
                children: [
                  {
                    key: "account",
                    icon: <UserOutlined />,
                    label: <Link href={"/dashboard/account"}>Tài khoản</Link>,
                    onClick: () => router.push("/dashboard/account"),
                  },
                  {
                    key: "security",
                    icon: <LockOutlined />,
                    label: <Link href={"/dashboard/security"}>Bảo mật</Link>,
                  },
                ],
              },
            ]}
          />
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.contentWrapper}>
        <Layout className={styles.content}>
          <Layout.Header className={styles.header}>
            <div className={styles.right}>
              <Badge count={10}>
                <Button size={"large"} icon={<BellOutlined />} type={"text"} />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    {
                      icon: <UserOutlined />,
                      key: "user",
                      label: "Tài khoản",
                      onClick: () => router.push("/dashboard/account"),
                    },
                    {
                      icon: <SettingOutlined />,
                      key: "settings",
                      label: (
                        <Link href={"/dashboard/security"}>Thiết lập</Link>
                      ),
                    },
                    {
                      type: "divider",
                    },
                    {
                      icon: <LogoutOutlined />,
                      key: "logout",
                      label: "Đăng xuất",
                      danger: true,
                      onClick: () => {
                        fetch("/auth/logout").then(() => {
                          location.reload();
                        });
                      },
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <div className={styles.user}>
                  <Avatar size={32} icon={<UserOutlined />} />
                  <div className={styles.name}>{account?.fullName}</div>
                </div>
              </Dropdown>
            </div>
          </Layout.Header>
          {/* <div className={styles.info}>
            <Breadcrumb
              className={styles.breadcrumb}
              items={pathname.split("/").map((key, index) => {
                if (index === 0) {
                  return {
                    title: <HomeOutlined />,
                  };
                }
                return {
                  title: `tt.${key}`,
                };
              })}
            />
            <Typography.Title className={"mt-2"} level={4}>
              {`f.${pathname}.name`}
            </Typography.Title>
          </div> */}
          <Layout className={styles.pageContent}>{props.children}</Layout>
        </Layout>
      </Layout.Content>
    </Layout>
  );
}
