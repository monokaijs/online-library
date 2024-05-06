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
  Typography,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import "./style.css";
import { toast } from "@/lib/utils/toast";

export default function BookDetail() {
  const router = useRouter();
  const { id } = useParams();
  const [{ data }, getBook] = useFormState(getBookByIdAction, {
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
    if (deleteState.success) {
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

  return (
    <Row className="h-full" gutter={24}>
      <Col span={17} className="flex flex-col h-full">
        <Card className="mb-6">
          <Flex gap={20}>
            <Image
              preview={false}
              style={{ minWidth: 200 }}
              src={data?.picture}
            />
            <div style={{ flex: 1 }}>
              <Flex
                justify="space-between"
                align="center"
                className="mb-1 w-full"
              >
                <Typography.Title className="ma-0" level={4}>
                  {data?.name}
                </Typography.Title>
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
                    <MoreOutlined />
                  </Button>
                </Dropdown>
              </Flex>
              <Typography.Text className="book-description mb-2">
                {data?.description}
              </Typography.Text>
              <Typography.Title className="ma-0" level={5}>
                Tác giả: {data?.authorName}
              </Typography.Title>
            </div>
          </Flex>
        </Card>
        <Typography.Title level={4}>Lịch sử mượn sách (15)</Typography.Title>
        <Card style={{ flex: 1, overflow: "auto" }}>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
          <Typography.Title className="ma-0" level={4}>
            {data?.name}
          </Typography.Title>
        </Card>
      </Col>
      <Col span={7} className="h-full">
        <Card className="h-full">
          <ModalDetailInfo
            records={[
              { fieldName: "Nhà xuất bản", value: data.publisher },
              { fieldName: "Năm xuất bản", value: data.publishYear },
              { fieldName: "Ngôn ngữ", value: data.language },
              { fieldName: "Mã sách", value: data.isbn },
              { fieldName: "Thể loại", value: data?.bookcase?.category },
              { fieldName: "Kệ sách", value: data.bookcase.position },
              { fieldName: "Thư viện", value: data?.bookcase?.library?.name },
              { fieldName: "Trạng thái", value: data.status },
              {
                fieldName: "Hạn mức mượn",
                value: data.borrowingDateLimit + " ngày",
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}
