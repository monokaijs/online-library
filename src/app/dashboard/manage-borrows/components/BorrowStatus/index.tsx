import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Tag } from "antd";
import dayjs from "dayjs";

export default function Status({ data }: { data: Borrow }) {
  const overdued = dayjs().diff(data.returnDate) > 0;
  const returned = data.status === BorrowStatus.RETURNED;
  const borrowing = data.status === BorrowStatus.BORROWING;

  return (
    <Tag
      color={
        borrowing ? (overdued ? "red" : "yellow") : returned ? "green" : "red"
      }
    >
      {borrowing ? "Đang mượn" : "Đã trả"}
    </Tag>
  );
}
