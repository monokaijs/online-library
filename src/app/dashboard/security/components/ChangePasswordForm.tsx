"use client";
import {Button, Card, Form, Input, Typography} from "antd";

export default function ChangePasswordForm() {
  return <Card>
    <div style={{paddingBottom: 24}}>
      <Typography.Title level={4}>
        Đổi mật khẩu
      </Typography.Title>
      <Typography.Text>
        Dùng biểu mẫu dưới để đổi mật khẩu tài khoản. Sau khi đổi mật khẩu, bạn có thể sẽ phải đăng nhập lại.
      </Typography.Text>
    </div>
    <Form
      layout={'vertical'}
    >
      <Form.Item label={'Mật khẩu cũ'} name={'oldPassword'}>
        <Input.Password placeholder={'Password...'}/>
      </Form.Item>
      <Form.Item label={'Mật khẩu mới'} name={'newPassword'}>
        <Input.Password placeholder={'Password...'}/>
      </Form.Item>
      <Form.Item label={'Nhập lại mật khẩu mới'} name={'repeatNewPassword'}>
        <Input.Password placeholder={'Password...'}/>
      </Form.Item>
      <Button type={'primary'}>
        Hoàn tất
      </Button>
    </Form>
  </Card>
}
