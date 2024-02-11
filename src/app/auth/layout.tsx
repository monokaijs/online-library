"use client";
import {ReactNode} from "react";
import styles from "./layout.module.scss";
import {Col, Row} from "antd";
import AuthBg from "@/assets/background/auth-bg.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({children}: AuthLayoutProps) {
  return <Row className={styles.authLayout}>
    <Col xs={0} sm={0} md={12} lg={16} className={styles.promo} style={{
      backgroundImage: `url(${AuthBg.src})`
    }}>
      Promo
    </Col>
    <Col xs={24} sm={24} md={12} lg={8}>
      {children}
    </Col>
  </Row>
}
