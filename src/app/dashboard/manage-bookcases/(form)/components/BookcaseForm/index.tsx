"use client";
import {
  createBookcaseAction,
  updateBookcaseAction,
} from "@/app/dashboard/manage-bookcases/action";
import { FormAction } from "@/constants/app.constant";
import { toast } from "@/lib/utils/toast";
import { Button, Form, Input, Typography, theme } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface BookcaseFormProps {
  action: FormAction;
  data?: any;
}

function BookcaseForm(props: BookcaseFormProps) {
  const router = useRouter();
  const { action, data } = props;
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [form] = Form.useForm();

  const [createState, createBookcase] = useFormState(createBookcaseAction, {
    success: false,
    message: "",
  });

  const [updateState, updateAction] = useFormState(updateBookcaseAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(createState);
    if (createState.success) {
      router.back();
    }
  }, [createState]);

  useEffect(() => {
    toast(updateState);
    if (updateState.success) {
      router.back();
    }
  }, [updateState]);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = (values: any) => {
    if (action === FormAction.CREATE) {
      createBookcase(values);
    } else {
      values._id = data._id;
      updateAction(values);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ flex: "200px" }}
      labelAlign="left"
      labelWrap
      className={"form-item-label-no-colon"}
      onFinish={onFinish}
    >
      <Form.Item
        name="position"
        label={
          <Typography.Text style={{ color: colorPrimary }}>
            Ngăn sách
          </Typography.Text>
        }
      >
        <Input placeholder={"Mã ngăn sách"} />
      </Form.Item>
      <Form.Item
        name="category"
        label={
          <Typography.Text style={{ color: colorPrimary }}>
            Thể loại
          </Typography.Text>
        }
      >
        <Input placeholder={"Thể loại"} />
      </Form.Item>
      <div className={"flex justify-end"}>
        <div className={"flex gap-9"}>
          <Button onClick={router.back}>Hủy bỏ</Button>
          <Button type={"primary"} htmlType="submit">
            {FormAction.CREATE === action ? " Thêm" : "Cập nhật"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default BookcaseForm;
