"use client";
import {
  createAccountAction,
  updateAccountAction,
} from "@/app/dashboard/manage-accounts/action";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Typography,
  message,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

function AccountForm({ account }: { account?: Account }) {
  const router = useRouter();
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
    if (account) {
      form.setFieldsValue({
        ...account,
        birthday: dayjs(account.birthday),
      });
    }
  }, []);

  const onFinish = (values: any) => {
    values.birthday = new Date(values.birthday);

    if (account) {
      values._id = account._id;
      updateAccount(values);
    } else {
      formAction(values);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{ flex: "200px" }}
      labelAlign="left"
      labelWrap
      form={form}
    >
      <Form.Item>
        <div className={"flex gap-9 items-end"}>
          <img src="/images/default-user-avatar.png" alt="avatar" />
          <div>
            <Button icon={<UploadOutlined />} type={"primary"}>
              Click to Upload
            </Button>
            <Typography className={"mt-2 color-gray_1"}>
              Ảnh có kích cỡ ít nhất 200x200 định dạng PNG hoặc JPG
            </Typography>
          </div>
        </div>
      </Form.Item>
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
        <Input placeholder={"Số điện thoại..."} />
      </Form.Item>
      <Form.Item name="identityNumber" label={"Số CCCD/CMND"}>
        <Input placeholder={"Số CCCD/CMND..."} />
      </Form.Item>
      <Form.Item label={"Ngày sinh"} name={"birthday"}>
        <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
      </Form.Item>
      <Form.Item name="gender" label={"Giới tính"}>
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
        <Input.TextArea placeholder={"Địa chỉ..."} />
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
          <Button htmlType="submit" type={"primary"}>
            {account ? "Lưu lại" : "Thêm bạn đọc"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default AccountForm;
