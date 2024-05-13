"use client";
import {
  createLocationAction,
  updateLocationAction,
} from "@/app/dashboard/manage-locations/action";
import { FormAction } from "@/constants/app.constant";
import { toast } from "@/lib/utils/toast";
import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  TimePicker,
  Typography,
  theme,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface LocationFormProps {
  action: FormAction;
  data?: any;
}

function LocationForm(props: LocationFormProps) {
  const router = useRouter();
  const { action, data } = props;
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [form] = Form.useForm();

  const [createState, createAction] = useFormState(createLocationAction, {
    success: false,
    message: "",
  });

  const [updateState, updateAction] = useFormState(updateLocationAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(createState);
    if (createState?.success) {
      router.back();
    }
  }, [createState]);

  useEffect(() => {
    toast(updateState);
    if (updateState?.success) {
      router.back();
    }
  }, [updateState]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        openingTime: dayjs(data?.openingTime),
        closingTime: dayjs(data?.closingTime),
      });
    }
  }, [data]);

  const onFinish = (values: any) => {
    values.openingTime = new Date(values.openingTime);
    values.closingTime = new Date(values.closingTime);

    if (action === FormAction.CREATE) {
      createAction(values);
    } else {
      values._id = data._id;
      updateAction(values);
    }
  };

  return (
    <>
      <Typography.Title level={4} className="mb-8">
        {action == FormAction.UPDATE ? "Cập nhật" : "Thêm"} thư viện
      </Typography.Title>
      <Form
        form={form}
        labelCol={{ flex: "200px" }}
        labelAlign="left"
        labelWrap
        className={"form-item-label-no-colon"}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Tên cơ sở
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên cơ sở",
              whitespace: true,
            },
          ]}
        >
          <Input allowClear placeholder={"Tên cơ sở"} />
        </Form.Item>
        <Form.Item
          name="address"
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Địa chỉ
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ",
              whitespace: true,
            },
          ]}
        >
          <Input allowClear placeholder={"Địa chỉ"} />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Số điện thoại
            </Typography.Text>
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
              whitespace: true,
            },
          ]}
        >
          <Input allowClear placeholder={"Số điện thoại"} />
        </Form.Item>
        <Form.Item name="status" label={"Tình trạng"} initialValue="opening">
          <Radio.Group
            options={[
              {
                label: "Đang hoạt động",
                value: "opening",
              },
              {
                label: "Dừng hoạt động",
                value: "closed",
              },
              {
                label: "Tạm thời dừng",
                value: "temporary_closed",
              },
            ]}
          />
        </Form.Item>
        <Row gutter={18}>
          <Col xs={24} lg={12}>
            <Form.Item
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Giờ mở cửa
                </Typography.Text>
              }
              name="openingTime"
              rules={[{ required: true, message: "Vui lòng chọn ngày mượn" }]}
              initialValue={dayjs("1/1/2021 8:30")}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12} className="return-date">
            <Form.Item
              label={
                <Typography.Text style={{ color: colorPrimary }}>
                  Giờ đóng cửa
                </Typography.Text>
              }
              name="closingTime"
              initialValue={dayjs("1/1/2021 17:30")}
              rules={[{ required: true, message: "Vui lòng chọn ngày trả" }]}
            >
              <TimePicker format="HH:mm" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <div className={"flex justify-end"}>
          <div className={"flex gap-9"}>
            <Button onClick={router.back}>Hủy bỏ</Button>
            <Button type={"primary"} htmlType="submit">
              {FormAction.CREATE === action ? " Thêm" : "Cập nhật"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default LocationForm;
