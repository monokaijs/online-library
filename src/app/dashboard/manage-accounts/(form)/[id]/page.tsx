"use client";

import Status from "@/app/dashboard/manage-borrows/components/BorrowStatus";
import UserRole from "@/components/shared/UserRole";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Card, Dropdown, Flex, Modal, Typography, theme } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { deleteAccountAction, getAccountDetailAction } from "../../action";
import { toast } from "@/lib/utils/toast";
import { SessionContext } from "@/components/shared/SessionContext";
import BorrowDetail from "@/app/dashboard/manage-borrows/components/BorrowDetail";

function AccountDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = theme.useToken();
  const ctx = useContext(SessionContext);
  const [detail, setDetail] = useState<Borrow>();

  const [{ data }, getAccountDetail] = useFormState(getAccountDetailAction, {
    success: false,
    data: undefined,
    message: "",
  });

  const [deleteState, deleteAction] = useFormState(deleteAccountAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(deleteState);
    if (deleteState?.success) {
      router.push(`/dashboard/manage-books`);
    }
  }, [deleteState]);

  useEffect(() => {
    getAccountDetail(id as string);
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

  return (
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
                  {account?.fullName}
                </Typography.Title>

                <Dropdown
                  menu={{
                    items: [
                      {
                        icon: <EditOutlined />,
                        key: "edit",
                        label: "Sửa thông tin",
                        onClick: () => {
                          router.push(
                            `/dashboard/manage-accounts/update/${id}`
                          );
                        },
                      },
                      {
                        key: "d",
                        type: "divider",
                      },
                      {
                        icon: <DeleteOutlined />,
                        key: "delete",
                        label: "Xóa tài khoản",
                        onClick: () => {
                          Modal.confirm({
                            title: "Hành động này không thể hoàn tác!",
                            content: `Xác nhận xóa tài khoản`,
                            okText: "Xóa",
                            cancelText: "Hủy",
                            onOk: () => {
                              deleteAction(id as string);
                            },
                          });
                        },
                        disabled: id === ctx.account?._id,
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

              <Typography.Text type="secondary">Ngày tham gia</Typography.Text>
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

            <div style={{ gridColumn: "span 5 / span 5", marginTop: 12 }}></div>

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
                Tên bạn đọc
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
                Trạng thái
              </Typography.Text>
              <Typography.Text
                strong
                className="text-center py-4"
                style={{ width: "17%", borderBottom: "1px solid #F0F0F0" }}
              >
                Thao tác
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
                    className="text-center py-3"
                    style={{
                      width: "32%",
                      borderRight: "1px solid #F0F0F0",
                    }}
                  >
                    {item?.user?.fullName}
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
                    {item.book?.library?.name}
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
                    <Button
                      onClick={() => {
                        setDetail(item);
                      }}
                      type={"text"}
                      shape={"circle"}
                      icon={
                        <EyeOutlined style={{ color: token.colorPrimary }} />
                      }
                    />
                  </Typography.Text>
                </div>
              );
            })}

            <BorrowDetail
              isOpen={!!detail}
              onCancel={() => {
                setDetail(undefined);
              }}
              detail={detail}
              deleteAction={(arg: any) => {
                deleteAction(arg);
              }}
              loadData={() => {
                getAccountDetail(id as string);
              }}
            />

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
  );
}

export default AccountDetailPage;
