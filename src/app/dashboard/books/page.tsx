"use client";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { Book, BookStatus } from "@/lib/models/book.model";
import { Bookcase } from "@/lib/models/bookcase.model";
import { Location } from "@/lib/models/library.model";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import {
  BookOutlined,
  EllipsisOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Button, Dropdown, Table, Tag } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getBookAction } from "../manage-books/action";
import ManageBookHeader from "./components/ManageBookHeader";
import ViewBookModal from "./components/ViewBookModal";
import BookStatusTag from "../manage-books/components/BookStatusTag";

function ManageBook() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Bookcase>();

  const createQueryString = useCallback(
    (paramsToUpdate: any) => {
      const updatedParams = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToUpdate).forEach(([key, value]: any) => {
        if (value === null || value === undefined || value === "") {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, value);
        }
      });

      router.push(pathname + "?" + updatedParams.toString());
    },
    [searchParams]
  );

  const [state, getData] = useFormState(getBookAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const loadData = () => {
    getData({
      ...state,
      limit: Number(searchParams.get("limit") ?? 20),
      page: Number(searchParams.get("page") ?? 1),
      filter: {
        query: searchParams.get("query") ?? "",
        type: searchParams.get("type") ?? "",
        library: searchParams.get("library") ?? "",
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [pathname, searchParams]);

  useDidMountEffect(() => {
    setLoading(false);
  }, [state]);

  const columns: any = [
    {
      title: searchParams.get("type") === "trending" ? "TOP" : "STT",
      key: "index",
      render: (_: any, record: any, index: number) => {
        ++index;
        return index + (state.page - 1) * state.limit;
      },
      align: "center",
    },
    {
      title: "Tên sách",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tác giả",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Mã sách",
      dataIndex: "bookID",
      key: "bookID",
      align: "center",
      render: (item: string) => item?.toUpperCase(),
    },
    {
      title: "Hạn mức",
      dataIndex: "borrowingDateLimit",
      key: "borrowingDateLimit",
      align: "center",
      render: (item: any) => `${item} ngày`,
    },
    searchParams.get("type") !== "trending"
      ? {
          title: "Thư viện",
          dataIndex: "library",
          key: "library",
          align: "center",
          render: (library: Location) => {
            return <div>{library?.name}</div>;
          },
        }
      : {
          title: "Số lượt mượn",
          dataIndex: "totalBorrowCount",
          key: "totalBorrowCount",
          align: "center",
          render: (item: string) => item ?? "-",
        },
    {
      title: "Tình trạng sách",
      key: "status",
      align: "center",
      render: (record: Book) => <BookStatusTag record={record} />,
    },
    {
      title: "Ngày mượn",
      key: "status",
      align: "center",
      render: (record: Book) => {
        return record.borrowRecord && record?.status !== BookStatus.AVAILABLE
          ? dayjs(record.borrowRecord?.borrowDate).format("DD/MM/YYYY")
          : "-";
      },
    },
    {
      title: "Ngày hẹn",
      key: "status",
      align: "center",
      render: (record: Book) => {
        return record.borrowRecord && record?.status !== BookStatus.AVAILABLE
          ? dayjs(record.borrowRecord?.returnDate).format("DD/MM/YYYY")
          : "-";
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (item: any) => {
        return (
          <div
            className={"flex justify-center"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Dropdown
              menu={{
                items: [
                  {
                    icon: <EyeOutlined />,
                    key: "view",
                    label: "Xem chi tiết",
                    onClick: () => {
                      router.push(`/dashboard/books/${item?._id}`);
                    },
                  },
                  {
                    type: "divider",
                  },
                  {
                    icon: <BookOutlined />,
                    key: "borrow",
                    label: "Tạo phiếu mượn",
                    onClick: () => {
                      router.push(
                        `/dashboard/borrows/create?book=${item?._id}`
                      );
                    },
                    disabled: item?.status !== BookStatus.AVAILABLE,
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Button type="text" shape="circle">
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <ManageBookHeader />
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={state?.data}
        pagination={{
          total: state?.totalDocs,
          pageSize: state?.limit,
          current: state?.page,
          pageSizeOptions: [10, 20, 30, 50, 100],
          showSizeChanger: true,
        }}
        onChange={(e) => {
          if (e.current && e.pageSize) {
            createQueryString({
              page: e.current == 1 ? "" : e.current,
              limit: e.pageSize == 20 ? "" : e.pageSize,
            });
          }
        }}
        onRow={(record: any) => ({
          onClick: () => {
            setDetail(record);
          },
        })}
      />
      <ViewBookModal
        isOpen={!!detail}
        onCancel={() => {
          setDetail(undefined);
        }}
        detail={detail}
      />
    </div>
  );
}

export default ManageBook;
