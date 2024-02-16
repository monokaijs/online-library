"use client";
import {ReactNode} from "react";
import {ConfigProvider, Input, Layout, Menu} from "antd";
import BookQuickView from "@/components/layouts/LibraryLayout/BookQuickView";
import styles from "./LibraryLayout.module.scss";
import {SearchOutlined} from "@ant-design/icons";

interface LibraryLayoutProps {
  children: ReactNode;
}

export default function LibraryLayout({children}: LibraryLayoutProps) {
  return <Layout className={styles.libraryLayout}>
    <Layout>
      <div className={styles.header}>
        <div className={styles.menu}>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  horizontalLineHeight: '70px',
                }
              }
            }}
          >
            <Menu
              mode={'horizontal'}
              items={[{
                key: 'home',
                label: <>Home</>,
                style:{paddingLeft: 32, paddingRight: 32, fontWeight: 600, fontSize: 16}
              }, {
                key: 'books',
                label: <>Books</>,
                style:{paddingLeft: 32, paddingRight: 32, fontWeight: 600, fontSize: 16}
              }, {
                key: 'about',
                label: <>About</>,
                style:{paddingLeft: 32, paddingRight: 32, fontWeight: 600, fontSize: 16}
              }]}
            />
          </ConfigProvider>
        </div>
        <div className={styles.searchInputWrapper}>
          <Input
            className={styles.searchInput}
            prefix={<SearchOutlined/>}
            size={'large'}
            placeholder={'Search '}
          />
        </div>
      </div>
      <Layout className={styles.contentWrapper}>
        <div className={styles.content}>
          {children}
        </div>
      </Layout>
    </Layout>
    <BookQuickView/>
  </Layout>
}
