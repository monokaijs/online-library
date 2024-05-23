import { loginAction } from "@/app/auth/login/actions";
import { googleConnectAction } from "@/app/dashboard/security/actions";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button, Divider, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from "./ResetForm.module.scss";
import { toast } from "@/lib/utils/toast";

interface FormProps {
  onSuccess?: () => any;
  redirectUri: string;
}

export default function ResetForm(props: FormProps) {
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useFormState(loginAction, {
    success: false,
  });
  useEffect(() => {
    if (state?.message)
      message[state?.success ? "success" : "error"](state?.message);
    if (state?.success) {
      props.onSuccess && props.onSuccess();
    }
    setLoading(false);
  }, [state]);

  const [stateLogin, gConnectAction] = useFormState(googleConnectAction, {
    message: "",
    success: false,
  });

  useEffect(() => {
    toast(stateLogin);
    setLoading(false);
  }, [stateLogin]);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => gConnectAction({ code: code, type: "google" }),
    onNonOAuthError: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
    redirect_uri: props.redirectUri,
  });

  return (
    <Form
      layout={"vertical"}
      className={styles.loginForm}
      // onFinish={(values) => {
      //   setLoading(true);
      //   formAction(values);
      // }}
    >
      <Form.Item label={"Email"} className={styles.item} name={"email"}>
        <Input allowClear placeholder={"someone@example.com"} />
      </Form.Item>
      <Button
        type={"primary"}
        htmlType={"submit"}
        block
        className={styles.signInBtn}
        loading={loading}
      >
        Continue
      </Button>
      <Divider>Or sign in with</Divider>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          login();
        }}
        icon={<GoogleOutlined />}
        block
      >
        Sign in with Google
      </Button>
    </Form>
  );
}
