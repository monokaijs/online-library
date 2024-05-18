import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { Tag } from "antd";

export default function Status({ data }: { data: Borrow }) {
  const overdued = getDaysDiff(data.returnDate) < 0;
  const returned = data?.status === BorrowStatus.RETURNED;
  const borrowing = data?.status === BorrowStatus.BORROWING;

  return (
    <Tag
      color={
        borrowing ? (overdued ? "red" : "orange") : returned ? "green" : "red"
      }
    >
      {borrowing ? "Đang mượn" : "Đã trả"}
    </Tag>
  );
}
