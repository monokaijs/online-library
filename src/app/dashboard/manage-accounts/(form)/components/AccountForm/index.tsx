"use client";
import {
  createAccountAction,
  updateAccountAction,
} from "@/app/dashboard/manage-accounts/action";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { RoleEnum } from "@/lib/models/account.model";
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

function AccountForm({
  account,
  onComplete,
}: {
  account?: Account;
  onComplete?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [state, formAction] = useFormState(createAccountAction, {} as any);
  const [updateStatus, updateAccount] = useFormState(updateAccountAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state?.message) {
      message[state?.success ? "success" : "error"](state?.message);
    }
    if (state?.success) {
      router.back();
    }
  }, [state]);

  useEffect(() => {
    if (updateStatus.message) {
      message[updateStatus.success ? "success" : "error"](updateStatus.message);
    }
    if (updateStatus?.success && onComplete) {
      onComplete();
      return;
    }
    if (updateStatus.success) {
      router.back();
    }
  }, [updateStatus]);

  useDidMountEffect(() => {
    setLoading(false);
  }, [state, updateStatus]);

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        ...account,
        birthday: account.birthday ? dayjs(account.birthday) : "",
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
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên!",
              whitespace: true,
            },
            {
              max: 30,
              message: "Họ và tên tối đa 30 kí tự",
            },
          ]}
          name="fullName"
          label={"Họ và tên"}
        >
          <Input allowClear placeholder={"Nguyễn Văn A"} disabled />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
              whitespace: true,
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email không hợp lệ",
            },
          ]}
          name="email"
          label={"Email"}
        >
          <Input
            allowClear
            disabled={!!account}
            placeholder={"example@gmail.com"}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
              whitespace: true,
            },
            {
              min: 10,
              message: "Số điện thoại tối thiểu 10 kí tự",
            },
            {
              max: 11,
              message: "Số điện thoại tối đa 11 kí tự",
            },
            {
              pattern: /^(?:\d*)$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
          name="phoneNumber"
          label={"Số điện thoại"}
        >
          <Input allowClear placeholder={"Số điện thoại"} />
        </Form.Item>
        {account?.role !== RoleEnum.USER && (
          <>
            <Form.Item name="userId" label={"Mã người dùng"}>
              <Input allowClear placeholder={"Mã người dùng"} />
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
          </>
        )}
        <Form.Item name="identityNumber" label={"Số CCCD/CMND"}>
          <Input allowClear placeholder={"Số CCCD/CMND"} />
        </Form.Item>
        <Form.Item label={"Ngày sinh"} name={"birthday"}>
          <DatePicker
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            disabledDate={(current) => {
              return dayjs().diff(current) < 0;
            }}
          />
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
