"use client";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import { BookStatus } from "@/lib/models/book.model";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface ViewBookModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: any;
  deleteAction: any;
}

export default function ViewBookModal(props: ViewBookModalProps) {
  const { onCancel, detail, deleteAction } = props;
  const router = useRouter();
  const overdued = dayjs().diff(detail?.returnDate) > 0;

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
          { fieldName: "Thư viện", value: detail?.bookcase?.library?.name },
          {
            fieldName: "Trạng thái",
            value: (
              <Tag
                color={
                  detail?.status === BookStatus.AVAILABLE
                    ? "green"
                    : detail?.status === BookStatus.OVERDUE || overdued
                    ? "red"
                    : "yellow"
                }
              >
                {detail?.status === BookStatus.AVAILABLE
                  ? "Đang trên kệ"
                  : detail?.status === BookStatus.OVERDUE || overdued
                  ? "Quá hạn"
                  : "Đang mượn"}
              </Tag>
            ),
          },
          {
            fieldName: "Hạn mức mượn",
            value: detail?.borrowingDateLimit + " ngày",
          },
          {
            fieldName: "Tạo lúc",
            value: dayjs(detail?.createdAt).format("HH:mm DD/MM/YYYY"),
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
              content: `Xác nhận xóa sách`,
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
