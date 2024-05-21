"use client";

import styles from "./styles.module.scss";
import LogoMain from "@/assets/figures/logo-main.png";
import {Col, Row, Typography} from "antd";

export default function LandingPageFooter() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.footer}>
        <Row className="w-full" gutter={[32, 32]}>
          <Col xs={24} lg={8}>
            <div className="gap-8">
              <img src={LogoMain.src} alt={"Logo"} className={styles.logo}/>
              <Typography.Text className="inline-block">
                D Free Book là một thư viện cộng đồng cho mượn sách miễn phí và đặt cọc niềm tin.
              </Typography.Text>
            </div>
          </Col>
          <Col xs={24} lg={16}>

          </Col>
        </Row>
      </div>
    </div>
  )
}