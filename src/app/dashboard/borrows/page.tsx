"use client";
import { SessionContext } from "@/components/shared/SessionContext";
import UserRole from "@/components/shared/UserRole";
import { Borrow, BorrowStatus, PaymentStatus } from "@/lib/models/borrow.model";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Modal,
  Spin,
  Tag,
  Typography,
  theme,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { cancelBorrowAction } from "../manage-borrows/action";
import Status from "../manage-borrows/components/BorrowStatus";
import { getProfileAction } from "./action";
import BorrowDetail from "./components/BorrowDetail";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import EditProfileModal from "./components/EditProfileModal";
import { toast } from "@/lib/utils/toast";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { fineCaculate } from "@/lib/utils/fineCaculate";

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Borrow>();
  const editModal = useDisclosure();

  const [cancel, cancelBorrow] = useFormState(cancelBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(cancel);
    if (cancel.success) {
      getProfile();
    }
  }, [cancel]);

  const [{ data }, getProfile] = useFormState(getProfileAction, {
    success: false,
    data: undefined,
    message: "",
  });

  useEffect(() => {
    setLoading(false);
  }, [data]);

  useEffect(() => {
    getProfile();
  }, []);

  const account: Account | undefined = data?.account;
  const history: Borrow[] | undefined = data?.history;

  const totalBorrow = history?.length ?? 0;
  const totalBorrowing =
    history?.filter((item) => item?.status === BorrowStatus.BORROWING).length ??
    0;
  const totalReturned =
    history?.filter((item) => item?.status !== BorrowStatus.BORROWING).length ??
    0;
  const totalOverdued =
    history?.filter((item) => item?.status === BorrowStatus.OVERDUE).length ??
    0;

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spin />;
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col overflow-hidden">
        <Flex gap={20} className="mb-4">
          <Card>
            <Flex gap={20}>
              <img
                src="/images/default-user-avatar.png"
                alt="avatar"
                style={{ width: 96, height: 96 }}
              />

              <div className="flex flex-col">
                <Flex
                  justify="space-between"
                  className="mb-1"
                  align="center"
                  gap={12}
                >
                  <Typography.Title className="ma-0" level={5}>
                    {account?.fullName ?? "Họ và tên"}
                  </Typography.Title>

                  <Dropdown
                    menu={{
                      items: [
                        {
                          icon: <EditOutlined />,
                          key: "edit",
                          label: "Sửa thông tin",
                          onClick: editModal.onOpen,
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button type="text" shape="circle">
                      <EllipsisOutlined style={{ fontWeight: 12 }} />
                    </Button>
                  </Dropdown>
                </Flex>
                <Typography.Text type="secondary">
                  <UserRole role={account?.role} />
                </Typography.Text>
                {account?.userId && (
                  <Typography.Text strong>{account?.userId}</Typography.Text>
                )}

                <Typography.Text type="secondary">
                  Ngày tham gia
                </Typography.Text>
                <Typography.Text>
                  {dayjs(account?.joinDate).format("DD/MM/YYYY")}
                </Typography.Text>
              </div>
            </Flex>
          </Card>
          <Card style={{ flex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "4px 12px",
              }}
            >
              <Typography.Text type="secondary">Giới tính</Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                Email
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                Địa chỉ
              </Typography.Text>

              <Typography.Text strong>
                {account?.gender == "male" ? "Nam" : "Nữ"}
              </Typography.Text>
              <Typography.Text
                strong
                className="one-line"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                {account?.email}
              </Typography.Text>
              <Typography.Text
                strong
                className="one-line"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                {account?.address}
              </Typography.Text>

              <div
                style={{ gridColumn: "span 5 / span 5", marginTop: 12 }}
              ></div>

              <Typography.Text type="secondary">Ngày sinh</Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                Số điện thoại
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                Số CCCD
              </Typography.Text>

              <Typography.Text strong className="one-line">
                {dayjs(account?.birthday).format("DD/MM/YYYY")}
              </Typography.Text>
              <Typography.Text
                strong
                className="one-line"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                {account?.phoneNumber}
              </Typography.Text>
              <Typography.Text
                strong
                className="one-line"
                style={{ gridColumn: "span 2 / span 2" }}
              >
                {account?.identityNumber}
              </Typography.Text>
            </div>
          </Card>
          <Card style={{ paddingRight: 15 }}>
            <div className="flex flex-col">
              <Typography.Title className="mb-1" level={5}>
                Sách
              </Typography.Title>
              <div className="flex flex-col gap-2">
                <Typography.Text>Đã mượn: {totalBorrow}</Typography.Text>
                <Typography.Text>Đang mượn: {totalBorrowing}</Typography.Text>
                <Typography.Text>Đã trả: {totalReturned}</Typography.Text>
                <Typography.Text>Số lần chậm: {totalOverdued}</Typography.Text>
              </div>
            </div>
          </Card>
        </Flex>

        <div className="flex flex-col overflow-hidden" style={{ flex: 1 }}>
          <Typography.Title level={4} className="mb-4">
            Lịch sử mượn sách ({data?.history?.length})
          </Typography.Title>
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              padding: 20,
              backgroundColor: "white",
              borderRadius: 8,
              border: "1px solid #F0F0F0",
            }}
          >
            <div
              style={{
                borderRadius: 8,
                border: "1px solid #F0F0F0",
                overflow: "auto",
                height: "100%",
              }}
            >
              <div
                className="flex"
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1000,
                }}
              >
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "32%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Sách
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Thư viện
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Ngày mượn
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Ngày hẹn
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Quá hẹn
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Tiền phạt
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Nộp phạt
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{
                    width: "17%",
                    borderBottom: "1px solid #F0F0F0",
                    borderRight: "1px solid #F0F0F0",
                  }}
                >
                  Trạng thái
                </Typography.Text>
                <Typography.Text
                  strong
                  className="text-center py-4"
                  style={{ width: "17%", borderBottom: "1px solid #F0F0F0" }}
                >
                  Hành động
                </Typography.Text>
              </div>
              {history?.map((item: Borrow, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex"
                    style={{
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    <Typography.Text
                      className="py-3"
                      style={{
                        width: "32%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      <span className="px-3">{item?.book?.name}</span>
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {item?.book?.library?.name}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {dayjs(item.borrowDate).format("DD/MM/YYYY")}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {dayjs(item.returnDate).format("DD/MM/YYYY")}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {getDaysDiff(item).label}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {fineCaculate(item).label}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      {fineCaculate(item).isLate ? (
                        item.paymentStatus === PaymentStatus.PAID ? (
                          <Tag color="green">Đã nộp</Tag>
                        ) : (
                          <Tag color="orange">Chưa nộp</Tag>
                        )
                      ) : (
                        "-"
                      )}
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                        borderRight: "1px solid #F0F0F0",
                      }}
                    >
                      <Status data={item} />
                    </Typography.Text>
                    <Typography.Text
                      className="text-center py-3"
                      style={{
                        width: "17%",
                      }}
                    >
                      <BorrowAction
                        item={item}
                        cancelBorrow={cancelBorrow}
                        setDetail={setDetail}
                      />
                    </Typography.Text>
                  </div>
                );
              })}

              {history?.length == 0 && (
                <div className="flex justify-center align-center py-12">
                  <Typography.Text type="secondary">
                    Không có lịch sử mượn.
                  </Typography.Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BorrowDetail
        isOpen={!!detail}
        onCancel={() => {
          setDetail(undefined);
        }}
        detail={detail}
        loadData={() => {
          getProfile();
        }}
      />
      <EditProfileModal
        isOpen={editModal.isOpen}
        onCancel={editModal.onClose}
        onComplete={() => {
          getProfile();
          editModal.onClose();
        }}
      />
    </div>
  );
}

function BorrowAction({ item, cancelBorrow, setDetail }: any) {
  const items: any = [
    {
      icon: <CloseCircleOutlined />,
      key: "cancel",
      label: "Hủy bỏ",
      onClick: () => {
        Modal.confirm({
          title: "Hành động này không thể hoàn tác!",
          content: `Hủy bỏ lượt mượn này`,
          okText: "Xác nhận",
          cancelText: "Hủy",
          onOk: () => {
            cancelBorrow(item._id);
          },
        });
      },
      disabled: item.status !== BorrowStatus.PENDING,
    },
    {
      icon: <EyeOutlined />,
      key: "view",
      label: "Xem chi tiết",
      onClick: () => {
        setDetail(item);
      },
    },
  ];

  function insertBetween(array: any, element: any) {
    return array.reduce((acc: any, current: any, index: any) => {
      if (index < array.length - 1) {
        return acc.concat(current, element);
      } else {
        return acc.concat(current);
      }
    }, []);
  }

  const dropdownItems = items.filter((item: any) => !item.disabled);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dropdown
        menu={{
          items: insertBetween(dropdownItems, {
            type: "divider",
          }),
        }}
        trigger={["click"]}
      >
        <Button type="text" shape="circle">
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
export default ProfilePage;
