"use client";

import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {
  deleteBookAction,
  getBookByIdAction,
} from "@/app/dashboard/manage-books/action";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Flex,
  Image,
  Modal,
  Row,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import "./style.css";
import { toast } from "@/lib/utils/toast";
import { getBorrowDetailAction, returnBookAction } from "../../action";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Book } from "@/lib/models/book.model";
import dayjs from "dayjs";
import Status from "../../components/BorrowStatus";

export default function BorrowDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [{ data }, getBorrowDetail] = useFormState(getBorrowDetailAction, {
    data: undefined,
    success: false,
    message: "",
  });

  useEffect(() => {
    getBorrowDetail(id as string);
  }, []);

  const [returnState, returnBook] = useFormState(returnBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(returnState);
    if (returnState.success) {
      router.push(`/dashboard/manage-borrows`);
    }
  }, [returnState]);

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const user: Account | undefined = data?.borrowRecord?.user;
  const borrowRecord: Borrow = data?.borrowRecord;
  const book: Book | undefined = data?.borrowRecord?.book;
  const analysis = data?.analysis;

  return (
    <Card
      className="h-full ma-auto"
      style={{ maxWidth: 1024 }}
      bodyStyle={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <Flex align="center" justify="space-between">
          <Typography.Title level={4} className="ma-0">
            Thông tin lượt mượn
          </Typography.Title>

          <Status data={borrowRecord} />
        </Flex>
        <Flex gap={20} className="mt-6">
          <Image
            preview={false}
            style={{
              width: 200,
              aspectRatio: "3/4",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
            src={
              "https://www.2020mag.com/CMSImagesContent/2014/9/Guy-Nerd-glasses_w.png"
            }
          />
          <div style={{ flex: 1 }}>
            <Typography.Title className="ma-0 mb-4" level={4}>
              Bạn đọc: {user?.fullName}
            </Typography.Title>
            <Flex gap={32}>
              <ModalDetailInfo
                title={false}
                records={[
                  { fieldName: "Vai trò", value: user?.role },
                  { fieldName: "SĐT", value: borrowRecord.phoneNumber },
                  { fieldName: "Email", value: borrowRecord.email },
                  { fieldName: "Địa chỉ", value: borrowRecord.address },
                ]}
              />
              <ModalDetailInfo
                title={false}
                records={[
                  { fieldName: "Sách đã mượn", value: analysis.total },
                  { fieldName: "Sách đang mượn", value: analysis.borrowing },
                  { fieldName: "Sách đã trả", value: analysis.returned },
                  { fieldName: "Số lần quá hẹn", value: analysis.overdued },
                ]}
              />
            </Flex>
          </div>
        </Flex>
        <Flex gap={20} className="mt-16">
          <Image
            preview={false}
            style={{
              width: 200,
              aspectRatio: "3/4",
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
            src={data?.borrowRecord?.book?.picture}
          />
          <div style={{ flex: 1 }}>
            <Typography.Title className="ma-0 mb-4" level={4}>
              Sách: {book?.name}
            </Typography.Title>
            <ModalDetailInfo
              title={false}
              records={[
                { fieldName: "Mã sách", value: book?.isbn },
                {
                  fieldName: "Thời gian",
                  value: `${dayjs(borrowRecord?.borrowDate).format(
                    "DD/MM/YYYY"
                  )} đến ${dayjs(borrowRecord?.returnDate).format(
                    "DD/MM/YYYY"
                  )}`,
                },
                { fieldName: "Thư viện", value: book?.bookcase?.library?.name },
                { fieldName: "Ghi chú", value: borrowRecord?.note },
              ]}
            />
          </div>
        </Flex>
      </div>

      {borrowRecord.status === BorrowStatus.BORROWING && (
        <Flex gap={4} justify="flex-end">
          <Button
            onClick={() => {
              router.push(`/dashboard/manage-borrows/update/${id}`);
            }}
          >
            Sửa thông tin
          </Button>
          <Button
            onClick={() => {
              Modal.confirm({
                title: "Hành động này không thể hoàn tác!",
                content: `Hoàn thành lượt mượn ${book?.name}`,
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => {
                  returnBook(borrowRecord._id);
                },
              });
            }}
          >
            Trả sách
          </Button>
        </Flex>
      )}
    </Card>
  );
}
