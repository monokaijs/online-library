import {Button, Divider, Form, Input, Typography} from "antd";
import Link from "next/link";
import styles from "./RegisterForm.module.scss";
import {ArrowRightOutlined, GoogleOutlined} from "@ant-design/icons";

export default function RegisterForm() {
  return <Form
    layout={'vertical'}
    className={styles.registerForm}
  >
    <Form.Item label={'Full name'} className={styles.item} name={'fullName'}>
      <Input
        placeholder={'Full name...'}
      />
    </Form.Item>
    <Form.Item label={'Email'} className={styles.item} name={'email'}>
      <Input
        placeholder={'example@d-freebook.com'}
      />
    </Form.Item>
    <Form.Item label={'Password'} className={styles.item}>
      <Input.Password/>
    </Form.Item>
    <Button type={'primary'} htmlType={'submit'} block className={styles.registerBtn}>
      Continue <ArrowRightOutlined/>
    </Button>
  </Form>
}
