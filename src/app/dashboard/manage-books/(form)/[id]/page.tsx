"use client";

import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {
  deleteBookAction,
  getBookDetailAction
} from "@/app/dashboard/manage-books/action";
import Status from "@/app/dashboard/manage-borrows/components/BorrowStatus";
import { SessionContext } from "@/components/shared/SessionContext";
import { RoleEnum } from "@/lib/models/account.model";
import { Borrow } from "@/lib/models/borrow.model";
import { toast } from "@/lib/utils/toast";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
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
  Typography
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import BookStatusTag from "../../components/BookStatusTag";
import "./style.css";

export default function BookDetail() {
  const { account } = useContext(SessionContext);
  const router = useRouter();
  const { id } = useParams();
  const [{ data }, getBook] = useFormState(getBookDetailAction, {
    data: undefined,
    success: false,
    message: "",
  });

  useEffect(() => {
    getBook(id as string);
  }, []);

  const [deleteState, deleteAction] = useFormState(deleteBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(deleteState);
    if (deleteState?.success) {
      router.push(`/dashboard/manage-books`);
    }
  }, [deleteState]);

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  const info = [
    { fieldName: "Nhà xuất bản", value: data?.book?.publisher },
    { fieldName: "Năm xuất bản", value: data?.book?.publishYear },
    { fieldName: "Ngôn ngữ", value: data?.book?.language },
    { fieldName: "Mã sách", value: data?.book?.bookID },
    { fieldName: "Thể loại", value: data?.book?.bookcase?.category },
    { fieldName: "Kệ sách", value: data?.book?.bookcase?.position },
    {
      fieldName: "Thư viện",
      value: data?.book?.library?.name,
    },
    {
      fieldName: "Trạng thái",
      value: <BookStatusTag record={data?.book} />,
    },
    {
      fieldName: "Hạn mức mượn",
      value: data?.book?.borrowingDateLimit + " ngày",
    },
  ];

  if (data?.book?.giver) {
    info.push({
      fieldName: "Người tặng",
      value: (
        <Link href={`/dashboard/manage-accounts/${data?.book?.giver?._id}`}>
          {data?.book?.giver?.fullName}
        </Link>
      ),
    });
  }

  return (
    <Row className="h-full" gutter={24}>
      <Col span={17} className="flex flex-col h-full">
        <Card className="mb-6">
          <Flex gap={20}>
            <Image
              preview={false}
              style={{ minWidth: 200, maxWidth: 240 }}
              src={data?.book?.picture}
            />
            <div style={{ flex: 1 }}>
              <Flex
                justify="space-between"
                align="center"
                className="mb-1 w-full"
              >
                <Typography.Title className="ma-0" level={4}>
                  {data?.book?.name}
                  {data?.book?.authorName ? " - " + data?.book?.authorName : ""}
                </Typography.Title>
                {account?.role !== RoleEnum.USER && (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          icon: <EditOutlined />,
                          key: "edit",
                          label: "Sửa thông tin",
                          onClick: () => {
                            router.push(`/dashboard/manage-books/update/${id}`);
                          },
                        },
                        {
                          key: "d",
                          type: "divider",
                        },
                        {
                          icon: <DeleteOutlined />,
                          key: "delete",
                          label: "Xóa sách",
                          onClick: () => {
                            Modal.confirm({
                              title: "Hành động này không thể hoàn tác!",
                              content: `Xác nhận xóa sách`,
                              okText: "Xóa",
                              cancelText: "Hủy",
                              onOk: () => {
                                deleteAction(id as string);
                              },
                            });
                          },
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Button type="text" shape="circle">
                      <EllipsisOutlined />
                    </Button>
                  </Dropdown>
                )}
              </Flex>
              <Typography.Text className="book-description mb-2">
                {data?.book?.description}
              </Typography.Text>
            </div>
          </Flex>
        </Card>
        <Typography.Title level={4}>
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
                style={{ width: "17%", borderBottom: "1px solid #F0F0F0" }}
              >
                Trạng thái
              </Typography.Text>
            </div>
            {data?.history?.map((item: Borrow, index: number) => {
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
                    type={(item?.user?.fullName ? "" : "secondary") as any}
                  >
                    {item?.user?.fullName ?? "Tài khoản bị xóa"}
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
                    }}
                  >
                    <Status data={item} />
                  </Typography.Text>
                </div>
              );
            })}

            {data?.history?.length == 0 && (
              <div className="flex justify-center align-center py-12">
                <Typography.Text type="secondary">
                  Không có lịch sử mượn.
                </Typography.Text>
              </div>
            )}
          </div>
        </div>
      </Col>
      <Col span={7} className="h-full">
        <Card className="h-full">
          <ModalDetailInfo records={info} />
        </Card>
      </Col>
    </Row>
  );
}
