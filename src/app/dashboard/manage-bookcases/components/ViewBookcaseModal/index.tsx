"use client";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

interface ViewBookcaseModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: any;
  deleteAction: any;
}

export default function ViewBookcaseModal(props: ViewBookcaseModalProps) {
  const { onCancel, detail, deleteAction } = props;

  const router = useRouter();

  return (
    <Modal
      open={!!detail}
      onCancel={onCancel}
      footer={null}
      width={640}
      centered
    >
      <ModalDetailInfo
        records={[
          {
            fieldName: "Mã ngăn sách : ",
            value: detail?.position ?? "Không rõ",
          },
          {
            fieldName: "Thể loại : ",
            value: detail?.category ?? "Không rõ",
          },
        ]}
      />

      <div className={"flex gap-9 mt-4 justify-end"}>
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            router.push(`/dashboard/manage-bookcases/update/${detail?._id}`);
            onCancel();
          }}
        >
          Sửa ngăn sách
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Hành động này không thể hoàn tác!",
              content: `Xác nhận xóa tủ sách`,
              okText: "Xóa",
              cancelText: "Hủy",
              onOk: () => {
                deleteAction(detail?._id);
              },
            });
          }}
        >
          Xóa ngăn sách
        </Button>
      </div>
    </Modal>
  );
}
