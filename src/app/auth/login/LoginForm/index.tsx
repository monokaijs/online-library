import {Button, Divider, Form, Input, message, Typography} from "antd";
import Link from "next/link";
import styles from "./LoginForm.module.scss";
import {ArrowRightOutlined, GoogleOutlined} from "@ant-design/icons";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {loginAction} from "@/app/auth/login/actions";

interface LoginFormProps {
  onSuccess?: () => any;
}

export default function LoginForm(props: LoginFormProps) {
  const [state, formAction] = useFormState(loginAction, {
    success: false,
  });
  useEffect(() => {
    if (state.message) message[state.success ? 'success' : 'error'](state.message);
    if (state.success) {
      props.onSuccess && props.onSuccess();
    }
  }, [state]);

  return <Form
    layout={'vertical'}
    className={styles.loginForm}
    onFinish={values => {
      formAction(values);
    }}
  >
    <Form.Item label={'Email'} className={styles.item} name={'email'}>
      <Input placeholder={'someone@example.com'}/>
    </Form.Item>
    <Form.Item label={'Password'} className={styles.item} name={'password'}>
      <Input.Password placeholder={'Password...'}/>
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
