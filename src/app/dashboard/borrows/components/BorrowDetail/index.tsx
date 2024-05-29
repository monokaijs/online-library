import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {
  getBorrowDetailAction,
  returnBookAction,
} from "@/app/dashboard/manage-borrows/action";
import Status from "@/app/dashboard/manage-borrows/components/BorrowStatus";
import UserRole from "@/components/shared/UserRole";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { fineCaculate } from "@/lib/utils/fineCaculate";
import { toast } from "@/lib/utils/toast";
import { Flex, Image, Modal, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

interface ViewBorrowModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: any;
  deleteAction?: any;
  loadData: any;
}

export default function BorrowDetail(props: ViewBorrowModalProps) {
  const { onCancel, detail, loadData } = props;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [state, getBorrowDetail] = useFormState(getBorrowDetailAction, {
    data: undefined,
    success: false,
    message: "",
  });

  useEffect(() => {
    if (detail?._id) {
      setLoading(true);
      getBorrowDetail(detail?._id as string);
    }
  }, [detail]);

  useEffect(() => {
    setLoading(false);
  }, [state]);

  const [returnState, returnBook] = useFormState(returnBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(returnState);
    if (returnState?.success) {
      loadData();
      onCancel();
    }
  }, [returnState]);

  const user: Account | undefined = state?.data?.borrowRecord?.user;
  const borrowRecord: Borrow | undefined = state?.data?.borrowRecord;
  const book: Book | undefined = state?.data?.borrowRecord?.book;
  const analysis: any = state?.data?.analysis;
  const borrowing = borrowRecord?.status === BorrowStatus.BORROWING;
  const { amount, label, isLate, diff } = fineCaculate(borrowRecord);

  return (
    <Modal
      open={!!detail}
      onCancel={onCancel}
      footer={null}
      width={980}
      centered
    >
      {loading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: 400 }}
        >
          <Spin />
        </div>
      ) : (
        <div
          className="h-full ma-auto borow-info"
          style={{
            maxWidth: 1024,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <Flex align="center" justify="space-between">
              <Typography.Title level={4} className="ma-0">
                Thông tin lượt mượn
              </Typography.Title>
            </Flex>
            <Flex gap={20} className="mt-6">
              <Image
                preview={false}
                style={{
                  width: 200,
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  // boxShadow: "1px solid #ccc",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
                src="/images/user.jpg"
              />
              <div style={{ flex: 1 }}>
                <Typography.Title className="ma-0 mb-4" level={4}>
                  Bạn đọc: {user?.fullName}
                </Typography.Title>
                <Flex gap={64}>
                  <ModalDetailInfo
                    title={false}
                    records={[
                      {
                        fieldName: "Vai trò",
                        value: <UserRole role={user?.role} />,
                      },
                      { fieldName: "SĐT", value: borrowRecord?.phoneNumber },
                      { fieldName: "Email", value: borrowRecord?.email },
                      { fieldName: "Địa chỉ", value: borrowRecord?.address },
                    ]}
                  />
                  <ModalDetailInfo
                    title={false}
                    records={[
                      { fieldName: "Sách đã mượn", value: analysis?.total },
                      {
                        fieldName: "Sách đang mượn",
                        value: analysis?.borrowing,
                      },
                      { fieldName: "Sách đã trả", value: analysis?.returned },
                      {
                        fieldName: "Số lần quá hẹn",
                        value: analysis?.overdued,
                      },
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
                  // border: "1px solid #ccc",
                  boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                }}
                src={
                  !!state?.data?.borrowRecord?.book?.picture
                    ? state?.data?.borrowRecord?.book?.picture
                    : "/images/default-book.png"
                }
              />
              <div style={{ flex: 1 }}>
                <Typography.Title className="ma-0 mb-4" level={4}>
                  Sách: {book?.name}
                </Typography.Title>
                <ModalDetailInfo
                  title={false}
                  records={[
                    { fieldName: "Mã sách", value: book?.bookID },
                    {
                      fieldName: "Thời gian",
                      value: `${dayjs(borrowRecord?.borrowDate).format(
                        "DD/MM/YYYY"
                      )} đến ${dayjs(borrowRecord?.returnDate).format(
                        "DD/MM/YYYY"
                      )}`,
                    },
                    {
                      fieldName: "Thư viện",
                      value: book?.library?.name,
                    },
                    { fieldName: "Ghi chú", value: borrowRecord?.note },
                    {
                      fieldName: "Tình trạng",
                      value:
                        isLate && borrowing
                          ? `Quá hẹn ${diff} ngày / Tiền phạt: ${amount}`
                          : borrowing
                          ? "Đang mượn"
                          : "Đã trả",
                    },
                  ]}
                />
              </div>
            </Flex>
          </div>
        </div>
      )}
    </Modal>
  );
}
