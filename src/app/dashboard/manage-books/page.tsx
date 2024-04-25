"use client";

import { Button, Card, Flex, Modal, Pagination, theme } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import { getBookcaseAction } from "@/app/dashboard/manage-books/action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlusOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { Book } from "@/lib/models/book.model";

export default function ManageBook() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const createQueryString = useCallback(
    (paramsToUpdate: any) => {
      const updatedParams = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToUpdate).forEach(([key, value]: any) => {
        if (value === null || value === undefined) {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, value);
        }
      });

      return updatedParams.toString();
    },
    [searchParams]
  );

  const [bookState, getAction] = useFormState(getBookcaseAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalDocs: 0,
    totalPages: 0,
  });

  useEffect(() => {
    getAction(bookState);
  }, []);

  const rowLabels = [
    "Tên sách",
    "Tác giả",
    "Mã sách",
    "Hạn mức (ngày)",
    "Thư viện",
    "Tình trạng sách",
    "Ngày mượn",
    "Ngày hẹn",
    "Thao tác",
  ];

  const [data, setData] = useState<Matrix<CellBase<any>>>([
    [
      {
        value: "redOnly + text-color",
        readOnly: true,
        className: "text-danger",
      },
      { value: "text-color", className: "text-danger" },
      { value: "readOnly", readOnly: true },
      { value: "readOnly + css", readOnly: true, className: "header-row" },
      { value: "css", className: "header-row" },
      { value: ["no options", "no option2"] },
    ],
    [
      { value: "Strawberry" },
      { value: "Cookies" },
      { value: "Vanilla" },
      { value: "Chocolate" },
      { value: "Citrus" },
      { value: "Green Apple" },
    ],
  ]);

  const booksToSheet = (books: Book[]) => {
    const sheet: Matrix<CellBase<any>> = books.map((item) => [
      {
        value: item.name,
      },
      {
        value: item.authorName,
      },
      {
        value: item.isbn,
      },
      {
        value: item.borrowingDateLimit,
      },
      {
        value: item.bookcase.category,
      },
      {
        value: item.status,
      },
      {
        value: item.status,
      },
      {
        value: item.status,
      },
    ]);

    return sheet;
  };

  useEffect(() => {
    const data = booksToSheet(bookState.data);
    setData(data);
  }, [bookState]);

  const format = booksToSheet(bookState.data);
  const isChange = JSON.stringify(format) == JSON.stringify(data);

  const handleRollback = () => {
    Modal.confirm({
      title: "Hủy bỏ các thao tác",
      onOk: () => {
        const rollbackData = booksToSheet(bookState.data);
        setData(rollbackData);
      },
      okText: "Hủy",
      cancelText: "Không",
      maskClosable: true
    });
  };

  const handleAddRow = () => {
    setData((prev) => [...prev, []]);
  };

  return (
    <Card>
      <Flex className="mb-4 justify-between">
        <Flex className="gap-6">
          <Button>Tất cả sách ({bookState.data.length})</Button>
          <Button>Sách trên kệ ({bookState.data.length - 1})</Button>
        </Flex>
        <Flex className="gap-6">
          {!isChange && (
            <Button icon={<CloseOutlined />} onClick={handleRollback}>
              Hủy
            </Button>
          )}
          <Button type="primary" icon={<SaveOutlined />} disabled={isChange}>
            Lưu lại
          </Button>
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAddRow}>
            Thêm mới
          </Button>
        </Flex>
      </Flex>
      <div>
        <Spreadsheet
          className="w-full"
          data={data}
          columnLabels={rowLabels}
          onChange={setData}
        />
      </div>
    </Card>
  );
}
