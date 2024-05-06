"use client";

import Status from "@/app/dashboard/manage-borrows/components/BorrowStatus";
import { RoleEnum } from "@/lib/models/account.model";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography, theme } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { getAccountDetailAction } from "../../action";

function AccountDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = theme.useToken();

  const [{ data }, getAccountDetail] = useFormState(getAccountDetailAction, {
    success: false,
    data: undefined,
    message: "",
  });

  useEffect(() => {
    getAccountDetail(id as string);
  }, []);

  const account: Account | undefined = data?.account;
  const history: Borrow[] | undefined = data?.history;
  const totalBorrow = history?.length ?? 0;
  const totalBorrowing =
    history?.filter((item) => item.status === BorrowStatus.BORROWING).length ??
    0;
  const totalReturned =
    history?.filter((item) => item.status !== BorrowStatus.BORROWING).length ??
    0;
  const totalOverdued =
    history?.filter((item) => item.status === BorrowStatus.OVERDUE).length ?? 0;

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
              <Typography.Title className="mb-1" level={5}>
                {account?.fullName}
              </Typography.Title>
              <Typography.Text type="secondary">
                {account?.role == RoleEnum.ADMIN ? "ADMIN" : "Bạn đọc"}
              </Typography.Text>
              {account?.userId && (
                <Typography.Text strong>{account?.userId}</Typography.Text>
              )}

              <Typography.Text type="secondary" className="mt-2">
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
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "4px 12px",
            }}
          >
            <Typography.Text type="secondary">Giới tính</Typography.Text>
            <Typography.Text type="secondary">Email</Typography.Text>
            <Typography.Text type="secondary">Địa chỉ</Typography.Text>

            <Typography.Text strong>
              {account?.gender == "male" ? "Nam" : "Nữ"}
            </Typography.Text>
            <Typography.Text strong>{account?.email}</Typography.Text>
            <Typography.Text strong>{account?.address}</Typography.Text>

            <div style={{ gridColumn: "span 3 / span 3", marginTop: 12 }}></div>

            <Typography.Text type="secondary">Ngày sinh</Typography.Text>
            <Typography.Text type="secondary">Số điện thoại</Typography.Text>
            <Typography.Text type="secondary">Số CCCD</Typography.Text>

            <Typography.Text strong>
              {dayjs(account?.birthday).format("DD/MM/YYYY")}
            </Typography.Text>
            <Typography.Text strong>{account?.phoneNumber}</Typography.Text>
            <Typography.Text strong>{account?.identityNumber}</Typography.Text>
          </div>
        </Card>
        <Card style={{ flex: 1 }}>
          <div className="flex flex-col">
            <Typography.Title className="mb-1" level={5}>
              Sách
            </Typography.Title>
            <div className="flex flex-col gap-2">
              <Typography.Text>Đã mượn: {totalBorrow} lượt</Typography.Text>
              <Typography.Text>Đang mượn: {totalBorrowing}</Typography.Text>
              <Typography.Text>
                Đã trả: {totalReturned} (
                {Math.round((totalReturned * 100) / totalBorrow)}
                %)
              </Typography.Text>
              <Typography.Text>
                Số lần chậm: {totalOverdued} (
                {Math.round((totalOverdued * 100) / totalBorrow)}
                %)
              </Typography.Text>
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
                  key={item._id}
                  className="flex"
                  style={{
                    borderBottom:
                      index < data?.history?.length - 1
                        ? "1px solid #F0F0F0"
                        : "",
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
                    {item.book?.bookcase?.library?.name}
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
                        router.push(`/dashboard/manage-borrows/${item?._id}`);
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetailPage;
