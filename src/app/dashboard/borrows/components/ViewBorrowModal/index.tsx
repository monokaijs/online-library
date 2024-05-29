"use client";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

interface ViewBorrowModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: any;
  deleteAction: any;
}

export default function ViewBorrowModal(props: ViewBorrowModalProps) {
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
          { fieldName: "Tên sách", value: detail?.name },
          { fieldName: "Nhà xuất bản", value: detail?.publisher },
          { fieldName: "Năm xuất bản", value: detail?.publishYear },
          { fieldName: "Ngôn ngữ", value: detail?.language },
          { fieldName: "Mã sách", value: detail?.isbn },
          { fieldName: "Thể loại", value: detail?.bookcase?.category },
          { fieldName: "Kệ sách", value: detail?.bookcase?.position },
          { fieldName: "Thư viện", value: detail?.library?.name },
          { fieldName: "Trạng thái", value: detail?.status },
          {
            fieldName: "Hạn mức mượn",
            value: detail?.borrowingDateLimit + " ngày",
          },
        ]}
      />

      <div className={"flex gap-9 mt-4 justify-end"}>
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            router.push(`/dashboard/manage-books/update/${detail?._id}`);
            onCancel();
          }}
        >
          Sửa thông tin
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Hành động này không thể hoàn tác!",
              content: `Xác nhận xóa phiếu mượn`,
              okText: "Xóa",
              cancelText: "Hủy",
              onOk: () => {
                deleteAction(detail?._id);
              },
            });
          }}
        >
          Xóa sách
        </Button>
      </div>
    </Modal>
  );
}
