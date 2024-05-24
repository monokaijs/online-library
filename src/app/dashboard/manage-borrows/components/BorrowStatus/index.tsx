import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { Tag } from "antd";

export default function Status({ data }: { data: Borrow }) {
  const overdued =
    data.status === BorrowStatus.BORROWING
      ? getDaysDiff(data.returnDate) < 0
      : false;

  const status: any = {
    borrowing: {
      color: "orange",
      label: "Đang mượn",
    },
    returned: {
      color: "green",
      label: "Đã trả",
    },
    pending: {
      color: "blue",
      label: "Chờ duyệt",
    },
    cancel: {
      color: "red",
      label: "Đã hủy",
    },
    overdue: {
      color: "red",
      label: "Đã trả",
    },
  };

  return (
    <Tag color={overdued ? "red" : status[data?.status]?.color}>
      {status[data?.status]?.label}
    </Tag>
  );
}
