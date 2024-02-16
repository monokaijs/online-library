import {Col, Layout, Row} from "antd";
import ChangePasswordForm from "@/app/dashboard/security/components/ChangePasswordForm";

export default function SecurityPage() {
  return <Layout style={{marginTop: 20}}>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={16} xl={10}>
        <ChangePasswordForm/>
      </Col>
    </Row>
  </Layout>
}
