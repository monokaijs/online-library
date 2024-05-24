import { Book, BookStatus } from "@/lib/models/book.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { Tag } from "antd";
import React from "react";

export default function BookStatusTag({ record }: { record: Book }) {
  const overdued =
    record.status === BookStatus.BORROWING
      ? getDaysDiff(record.borrowRecord?.returnDate) < 0
      : false;

  const status: any = {
    borrowing: {
      color: "orange",
      label: "Đang mượn",
    },
    available: {
      color: "green",
      label: "Đang trên kệ",
    },
    pending: {
      color: "blue",
      label: "Chờ duyệt",
    },
    overdue: {
      color: "red",
      label: "Đang mượn",
    },
  };

  return (
    <Tag color={overdued ? "red" : status[record?.status]?.color}>
      {status[record?.status]?.label}
    </Tag>
  );
}
