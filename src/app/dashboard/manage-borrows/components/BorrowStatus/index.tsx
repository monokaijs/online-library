import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function Status({ data }: { data: Borrow }) {
  const overdued = dayjs().diff(data.returnDate) > 0;

  return (
    <Tag
      color={
        data.status === BorrowStatus.RETURNED
          ? "green"
          : overdued
          ? "red"
          : "yellow"
      }
    >
      {data.status === BorrowStatus.RETURNED
        ? "Đã trả"
        : overdued
        ? `Quá hạn`
        : `Đang mượn`}
    </Tag>
  );
}
