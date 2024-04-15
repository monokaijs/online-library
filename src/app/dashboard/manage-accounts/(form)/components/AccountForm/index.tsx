"use client";
import { createAccountAction } from "@/app/dashboard/manage-accounts/action";
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
import { useEffect } from "react";
import { useFormState } from "react-dom";

function AccountForm() {
  const [form] = Form.useForm();

  const [state, formAction] = useFormState(createAccountAction, {} as any);

  useEffect(() => {
    if (state.message)
      message[state.success ? "success" : "error"](state.message);
  }, [state]);

  const onFinish = (values: any) => {
    values.birthday = new Date(values.birthday);
    formAction(values);
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
        <Input placeholder={"example@gmail.com"} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        name="phoneNumber"
        label={"Số điện thoại"}
      >
        <Input placeholder={"Số điện thoại..."} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Vui lòng nhập CCCD/CMND!" }]}
        name="identityNumber"
        label={"Số CCCD/CMND"}
      >
        <Input placeholder={"Số CCCD/CMND..."} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Vui lòng nhập ngày sinh!" }]}
        label={"Ngày sinh"}
        name={"birthday"}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Vui lòng chọn giới tính !" }]}
        name="gender"
        label={"Giới tính"}
      >
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
      <Form.Item
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        name="address"
        label={"Địa chỉ"}
      >
        <Input.TextArea placeholder={"Địa chỉ..."} />
      </Form.Item>
      <div className={"flex justify-end"}>
        <div className={"flex gap-9"}>
          <Button>Hủy bỏ</Button>
          <Button htmlType="submit" type={"primary"}>
            Thêm bạn đọc
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default AccountForm;
