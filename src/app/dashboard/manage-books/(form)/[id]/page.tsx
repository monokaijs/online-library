"use client";

import { getBookByIdAction } from "@/app/dashboard/manage-books/action";
import { Card, Col, Flex, Image, Row, Spin, Typography } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import "./style.css";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";

export default function BookDetail() {
  const { id } = useParams();
  const [{ data }, getBook] = useFormState(getBookByIdAction, {
    data: undefined,
    success: false,
    message: "",
  });

  useEffect(() => {
    getBook(id as string);
  }, []);

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
          <Flex align="center" gap={20}>
            <Image
              preview={false}
              style={{ minWidth: 200 }}
              src={data?.picture}
            />
            <div>
              <Typography.Title level={4}>{data?.name}</Typography.Title>
              <Typography.Text className="book-description">
                {data?.description}
              </Typography.Text>
              <Typography.Title level={5}>
                Tác giả: {data?.authorName}
              </Typography.Title>
            </div>
          </Flex>
        </Card>
        <Typography.Title level={4}>Lịch sử mượn sách (15)</Typography.Title>
        <Card style={{ flex: 1, overflow: "auto" }}></Card>
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
              { fieldName: "Thư viện", value: data.bookcase.library.name },
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
