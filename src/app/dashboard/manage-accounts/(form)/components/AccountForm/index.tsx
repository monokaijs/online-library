"use client";
import {
  createAccountAction,
  updateAccountAction,
} from "@/app/dashboard/manage-accounts/action";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Radio,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

function AccountForm({ account }: { account?: Account }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [state, formAction] = useFormState(createAccountAction, {} as any);
  const [updateStatus, updateAccount] = useFormState(updateAccountAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      message[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      router.back();
    }
  }, [state]);

  useEffect(() => {
    if (updateStatus.message) {
      message[updateStatus.success ? "success" : "error"](updateStatus.message);
    }
    if (updateStatus.success) {
      router.back();
    }
  }, [updateStatus]);

  useEffect(() => {
    setLoading(false);
  }, [state, updateStatus]);

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        ...account,
        birthday: dayjs(account.birthday),
      });
    }
  }, [account]);

  const onFinish = (values: any) => {
    setLoading(true);
    values.birthday = new Date(values.birthday);

    if (account) {
      values._id = account._id;
      updateAccount(values);
    } else {
      formAction(values);
    }
  };

  return (
    <Card style={{ width: 714, margin: "0 auto" }}>
      <Typography.Title level={4} className="mb-8">
        {account ? "Cập nhật" : "Thêm"} người dùng
      </Typography.Title>
      <Form
        disabled={loading}
        onFinish={onFinish}
        labelCol={{ flex: "200px" }}
        labelAlign="left"
        labelWrap
        form={form}
      >
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          name="fullName"
          label={"Họ và tên"}
        >
          <Input placeholder={"Nguyễn Văn A"} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          name="email"
          label={"Email"}
        >
          <Input disabled={!!account} placeholder={"example@gmail.com"} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          name="phoneNumber"
          label={"Số điện thoại"}
        >
          <Input placeholder={"Số điện thoại"} />
        </Form.Item>
        <Form.Item name="userId" label={"Mã người dùng"}>
          <Input placeholder={"Mã người dùng"} />
        </Form.Item>
        <Form.Item name="role" label={"Vai trò"} initialValue={"user"}>
          <Radio.Group
            options={[
              {
                label: "Bạn đọc",
                value: "user",
              },
              {
                label: "Thủ thư",
                value: "manager",
              },
              {
                label: "Quản trị viên",
                value: "admin",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="identityNumber" label={"Số CCCD/CMND"}>
          <Input placeholder={"Số CCCD/CMND"} type="number" />
        </Form.Item>
        <Form.Item label={"Ngày sinh"} name={"birthday"}>
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item name="gender" label={"Giới tính"} initialValue={"male"}>
          <Radio.Group
            options={[
              {
                label: "Nam",
                value: "male",
              },
              {
                label: "Nữ",
                value: "female",
              },
              {
                label: "Khác",
                value: "orther",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="address" label={"Địa chỉ"}>
          <Input.TextArea placeholder={"Địa chỉ"} />
        </Form.Item>
        <div className={"flex justify-end"}>
          <div className={"flex gap-9"}>
            <Button
              onClick={() => {
                router.back();
              }}
            >
              Hủy bỏ
            </Button>
            <Button htmlType="submit" type={"primary"} loading={loading}>
              {account ? "Lưu lại" : "Thêm người dùng"}
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}

export default AccountForm;
