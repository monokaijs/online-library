import {Button, Checkbox, DatePicker, Divider, Form, Input, message, Typography} from "antd";
import Link from "next/link";
import styles from "./RegisterForm.module.scss";
import {ArrowRightOutlined, GoogleOutlined} from "@ant-design/icons";
import {registerAction, RegisterState} from "@/app/auth/register/actions";
import {useFormState} from "react-dom";
import {useEffect} from "react";

export default function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, {
    success: false,
  });
  useEffect(() => {
    if (state.message) return message[state.success ? 'success' : 'error'](state.message);
  }, [state]);

  return <Form
    layout={'vertical'}
    className={styles.registerForm}
    onFinish={values => {
      values.birthday = new Date(values.birthday);
      formAction(values);
    }}
  >
    <Form.Item label={'Họ và tên'} className={styles.item} name={'fullName'}>
      <Input
        placeholder={'Nguyễn Văn A'}
      />
    </Form.Item>
    <Form.Item label={'Email'} className={styles.item} name={'email'}>
      <Input
        placeholder={'example@d-freebook.com'}
      />
    </Form.Item>
    <Form.Item label={'Ngày sinh'} className={styles.item} name={'birthday'}>
      <DatePicker style={{width: '100%'}} />
    </Form.Item>
    <Form.Item label={'Mật khẩu'} className={styles.item} name={'password'}>
      <Input.Password
        placeholder={'Mật khẩu...'}
      />
    </Form.Item>
    <Form.Item className={styles.item} name={'password'}>
      <Checkbox/> Đồng ý với <Link href={'/terms'}>Điều khoản & Thoả thuận</Link>
    </Form.Item>
    <Button type={'primary'} htmlType={'submit'} block className={styles.registerBtn}>
      Continue <ArrowRightOutlined/>
    </Button>
  </Form>
}
