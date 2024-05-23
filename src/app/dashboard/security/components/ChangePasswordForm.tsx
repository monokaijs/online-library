"use client";
import { Button, Card, Form, Input, Typography } from "antd";
import { useFormState } from "react-dom";
import { changePasswordAction } from "@/app/dashboard/security/actions";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { toast } from "@/lib/utils/toast";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [state, changePassAction] = useFormState(changePasswordAction, {
    message: "",
    success: false,
  });

  useDidMountEffect(() => {
    setLoading(false);
    toast(state);
    if (state?.success) {
      form.resetFields();
    }
  }, [state]);

  const finish = (values: any) => {
    setLoading(true);
    changePassAction(values);
  };

  return (
    <Card>
      <div style={{ paddingBottom: 24 }}>
        <Typography.Title level={4}>Đổi mật khẩu</Typography.Title>
        <Typography.Text>
          Dùng biểu mẫu dưới để đổi mật khẩu tài khoản. Sau khi đổi mật khẩu,
          bạn có thể sẽ phải đăng nhập lại.
        </Typography.Text>
      </div>

      <Form
        onFinish={finish}
        layout={"vertical"}
        disabled={loading}
        form={form}
      >
        <Form.Item
          label={"Mật khẩu cũ"}
          name={"oldPassword"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder={"Old Password..."} />
        </Form.Item>
        <Form.Item
          label={"Mật khẩu mới"}
          name={"newPassword"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder={"New Password..."} />
        </Form.Item>
        <Form.Item
          label={"Nhập lại mật khẩu mới"}
          name={"repeatPassword"}
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder={"Repeat Password..."} />
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"} loading={loading}>
          Hoàn tất
        </Button>
      </Form>
    </Card>
  );
}
