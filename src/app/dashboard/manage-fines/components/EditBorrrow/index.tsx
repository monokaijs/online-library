import { FormAction } from "@/constants/app.constant";
import { Borrow } from "@/lib/models/borrow.model";
import { Button, Form, Input, Modal, Typography, theme } from "antd";
import { useFormState } from "react-dom";
import { updateBorrowAction } from "../../action";
import { useEffect } from "react";
import { toast } from "@/lib/utils/toast";

interface ViewBorrowModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: Borrow;
  loadData: any;
}

export default function EditBorrow(props: ViewBorrowModalProps) {
  const { onCancel, detail, loadData, isOpen } = props;
  const [form] = Form.useForm();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [updateState, updateAction] = useFormState(updateBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(updateState);
    if (updateState?.success) {
      loadData();
      onCancel();
    }
  }, [updateState]);

  const onFinish = (data: any) => {
    data._id = detail?._id;
    updateAction(data);
  };

  useEffect(() => {
    form.setFieldsValue({
      hashFineAmount: detail?.hashFineAmount,
      description: detail?.description,
    });
  }, [detail]);

  return (
    <Modal
      title="Sửa phiếu mượn"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        labelCol={{ flex: "200px" }}
        labelAlign="left"
        labelWrap
        className={"form-item-label-no-colon mt-4"}
        onFinish={onFinish}
      >
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Số tiền phạt
            </Typography.Text>
          }
          name={"hashFineAmount"}
        >
          <Input allowClear placeholder="Nhập số tiền phạt" type="number" />
        </Form.Item>
        <Form.Item
          label={
            <Typography.Text style={{ color: colorPrimary }}>
              Ghi chú
            </Typography.Text>
          }
          name={"description"}
        >
          <Input allowClear placeholder="Nhập ghi chú" />
        </Form.Item>
        <div className={"flex justify-end"}>
          <div className={"flex gap-9"}>
            <Button onClick={onCancel}>Hủy bỏ</Button>
            <Button type={"primary"} htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
