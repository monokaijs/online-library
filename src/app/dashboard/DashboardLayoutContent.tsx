"use client";
import LogoMainCollapsed from "@/assets/figures/logo-main-collapsed.png";
import LogoMain from "@/assets/figures/logo-main.png";
import { SessionContext } from "@/components/shared/SessionContext";
import { RoleEnum } from "@/lib/models/account.model";
import {
  BarChartOutlined,
  BellOutlined,
  BookOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  ReconciliationOutlined,
  RetweetOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";
import styles from "./layout.module.scss";
import Forbidden from "./forbidden/page";

export default function DashboardLayoutContent(props: any) {
  const { account } = useContext(SessionContext);
  if (!account) {
    return <Forbidden />;
  }

  const router = useRouter();
  const pathname = usePathname();
  const isUserRole = account?.role === RoleEnum.USER;

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 1300) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const menus = [
    {
      key: "dashboard",
      icon: <BarChartOutlined />,
      label: <Link href={"/dashboard"}>Trang chủ</Link>,
    },
    {
      key: "manage-accounts",
      icon: <SolutionOutlined />,
      label: (
        <Link href={"/dashboard/manage-accounts"}>Quản lý người dùng</Link>
      ),
      disabled: isUserRole,
    },
    {
      key: "books",
      icon: <BookOutlined />,
      label: <Link href={"/dashboard/books"}>Sách hiện có</Link>,
      disabled: !isUserRole,
    },
    {
      key: "manage-books",
      icon: <BookOutlined />,
      label: <Link href={"/dashboard/manage-books"}>Quản lý sách</Link>,
      disabled: isUserRole,
    },
    {
      key: "borrows",
      icon: <RetweetOutlined />,
      label: <Link href={"/dashboard/borrows"}>Thông tin cá nhân</Link>,
      disabled: !isUserRole,
    },
    {
      key: "manage-borrows",
      icon: <RetweetOutlined />,
      label: <Link href={"/dashboard/manage-borrows"}>Mượn - trả sách</Link>,
      disabled: isUserRole,
    },
    {
      key: "manage-fines",
      icon: <ReconciliationOutlined />,
      label: <Link href={"/dashboard/manage-fines"}>Quản lý tiền phạt</Link>,
      disabled: isUserRole,
    },
    {
      key: "manage-bookcases",
      icon: <TableOutlined />,
      label: <Link href={"/dashboard/manage-bookcases"}>Quản lý tủ sách</Link>,
      disabled: isUserRole,
    },
    {
      key: "locations",
      icon: <HomeOutlined />,
      label: <Link href={"/dashboard/locations"}>Hệ thống thư viện</Link>,
      disabled: !isUserRole,
    },
    {
      key: "manage-locations",
      icon: <HomeOutlined />,
      label: <Link href={"/dashboard/manage-locations"}>Quản lý thư viện</Link>,
      disabled: isUserRole,
    },
    {
      key: "manage-locations",
      icon: <MessageOutlined />,
      label: <Link href={"/dashboard/forums"}>Diễn đàn</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: `Thiết lập`,
      children: [
        // {
        //   key: "account",
        //   icon: <UserOutlined />,
        //   label: <Link href={"/dashboard/account"}>Tài khoản</Link>,
        //   onClick: () => router.push("/dashboard/account"),
        // },
        {
          key: "security",
          icon: <LockOutlined />,
          label: <Link href={"/dashboard/security"}>Bảo mật</Link>,
        },
      ],
    },
  ];

  return (
    <Layout className={styles.dashboardLayout}>
      <Layout.Sider
        width={230}
        className={styles.sider}
        collapsed={collapsed}
        collapsible
        onCollapse={toggleCollapsed}
        trigger={
          collapsed ? (
            <DoubleRightOutlined style={{ color: "black" }} />
          ) : (
            <DoubleLeftOutlined style={{ color: "black" }} />
          )
        }
      >
        <div className="app-sidebar">
          <div className={styles.siderContent}>
            <img
              onClick={() => {
                router.push("/dashboard");
              }}
              src={collapsed ? LogoMainCollapsed.src : LogoMain.src}
              alt={"Logo"}
              className={styles.logo}
            />
            <Menu
              mode={"inline"}
              className={styles.menu}
              defaultSelectedKeys={[pathname.split("/")[2] ?? "dashboard"]}
              items={menus.filter((item) => !item.disabled)}
            />
          </div>
        </div>
      </Layout.Sider>
      <Layout.Content className={styles.contentWrapper}>
        <Layout className={styles.content}>
          <Layout.Header className={styles.header}>
            <div className={styles.right}>
              <Badge count={0}>
                <Button
                  disabled={true}
                  size={"large"}
                  icon={<BellOutlined />}
                  type={"text"}
                />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    // {
                    //   icon: <UserOutlined />,
                    //   key: "user",
                    //   label: "Tài khoản",
                    //   onClick: () => router.push("/dashboard/account"),
                    // },
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
                  <Avatar
                    size={32}
                    src={account?.profilePicture}
                    style={{ border: "1px solid #ccc" }}
                    icon={<UserOutlined />}
                  />
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
