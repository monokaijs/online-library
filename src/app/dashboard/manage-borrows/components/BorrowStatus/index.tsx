import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { Tag } from "antd";

export default function Status({ data }: { data: Borrow }) {
  const overdued =
    data.status === BorrowStatus.BORROWING ? getDaysDiff(data).isLate : false;

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
      color: "gray",
      label: "Đã hủy",
      textColor: "#878384",
    },
    overdue: {
      color: "red",
      label: "Đã trả",
    },
  };

  return (
    <Tag
      color={
        status[data?.status]?.textColor
          ? ""
          : overdued
          ? "red"
          : status[data?.status]?.color
      }
      style={{
        color: status[data?.status]?.textColor,
      }}
    >
      {status[data?.status]?.label}
    </Tag>
  );
}
