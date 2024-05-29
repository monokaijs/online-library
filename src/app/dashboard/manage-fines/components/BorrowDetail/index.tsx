import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {
  getBorrowDetailAction,
  returnBookAction,
} from "@/app/dashboard/manage-borrows/action";
import UserRole from "@/components/shared/UserRole";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus, PaymentStatus } from "@/lib/models/borrow.model";
import { fineCaculate } from "@/lib/utils/fineCaculate";
import { toast } from "@/lib/utils/toast";
import { Button, Flex, Image, Modal, Spin, Typography } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { payFineAction } from "../../action";
import EditBorrow from "../EditBorrrow";
import { useDisclosure } from "@/lib/hooks/useDisclosure";

interface ViewBorrowModalProps {
  isOpen: boolean;
  onCancel: () => void;
  detail?: any;
  deleteAction: any;
  loadData: any;
}

export default function BorrowDetail(props: ViewBorrowModalProps) {
  const { onCancel, detail, loadData, isOpen } = props;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const editModal = useDisclosure();

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

  const [payState, payFine] = useFormState(payFineAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(payState);
    if (payState?.success) {
      loadData();
      onCancel();
    }
  }, [payState]);

  const user: Account | undefined = state?.data?.borrowRecord?.user;
  const borrowRecord: Borrow | undefined = state?.data?.borrowRecord;
  const book: Book | undefined = state?.data?.borrowRecord?.book;
  const analysis: any = state?.data?.analysis;
  const borrowing = borrowRecord?.status === BorrowStatus.BORROWING;
  const { amount, diff, isLate } = fineCaculate(borrowRecord);

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={null} width={980} centered>
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
                        borrowRecord?.status === BorrowStatus.PENDING
                          ? "Đang chờ duyệt"
                          : isLate && borrowing
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

          <EditBorrow
            isOpen={editModal.isOpen}
            onCancel={() => {
              editModal.onClose();
            }}
            detail={detail}
            loadData={loadData}
          />

          <Flex gap={4} justify="flex-end">
            <Button
              onClick={editModal.onOpen}
              disabled={
                borrowRecord?.status === BorrowStatus.BORROWING ||
                borrowRecord?.paymentStatus === PaymentStatus.PAID
              }
            >
              Sửa thông tin
            </Button>
            <Button
              disabled={
                borrowRecord?.status === BorrowStatus.BORROWING ||
                borrowRecord?.paymentStatus === PaymentStatus.PAID
              }
              onClick={() => {
                Modal.confirm({
                  title: "Hành động này không thể hoàn tác!",
                  content: `Hoàn thành phiếu phạt`,
                  okText: "Xác nhận",
                  cancelText: "Hủy",
                  onOk: () => {
                    payFine(borrowRecord?._id);
                  },
                });
              }}
            >
              Đã thu tiền
            </Button>
          </Flex>
        </div>
      )}
    </Modal>
  );
}
