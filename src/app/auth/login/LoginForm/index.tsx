import {Button, Divider, Form, Input, Typography} from "antd";
import Link from "next/link";
import styles from "./LoginForm.module.scss";
import {ArrowRightOutlined, GoogleOutlined} from "@ant-design/icons";

export default function LoginForm() {
  return <Form
    layout={'vertical'}
    className={styles.loginForm}
  >
    <Form.Item label={'Email'} className={styles.item}>
      <Input/>
    </Form.Item>
    <Form.Item label={'Password'} className={styles.item}>
      <Input.Password/>
    </Form.Item>
    <div className={styles.resetPassword}>
      <Link href={'/auth/reset-password'}>
        Reset Password
      </Link>
    </div>
    <Button type={'primary'} htmlType={'submit'} block className={styles.signInBtn}>
      Login <ArrowRightOutlined/>
    </Button>
    <Divider>
      Or sign in with
    </Divider>
    <Button icon={<GoogleOutlined/>} block>
      Sign in with Google
    </Button>
  </Form>
}
