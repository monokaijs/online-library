import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { Tag } from "antd";

export default function Status({ data }: { data: Borrow }) {
  const isLate = getDaysDiff(data).isLate;
  const returned = data?.status === BorrowStatus.RETURNED;
  const borrowing = data?.status === BorrowStatus.BORROWING;

  return (
    <Tag
      color={
        borrowing ? (isLate ? "red" : "orange") : returned ? "green" : "red"
      }
    >
      {borrowing ? "Đang mượn" : "Đã trả"}
    </Tag>
  );
}
