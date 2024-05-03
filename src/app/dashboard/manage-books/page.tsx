"use client";
import {
  deleteBookcaseAction,
  getBookcaseAction,
} from "@/app/dashboard/manage-bookcases/action";
import { Bookcase } from "@/lib/models/bookcase.model";
import { toast } from "@/lib/utils/toast";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Table, Tag, theme } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ViewBookModal from "./components/ViewBookModal";
import { getBookAction, deleteBookAction } from "./action";
import { Library } from "@/lib/models/library.model";
import { render } from "nprogress";
import { Book, BookStatus } from "@/lib/models/book.model";
import dayjs from "dayjs";

function ManageBook() {
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Bookcase>();

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

  const [state, getData] = useFormState(getBookAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const [deleteState, deleteAction] = useFormState(deleteBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getData(state);
  }, []);

  useEffect(() => {
    toast(deleteState);
    if (deleteState.success) {
      getData(state);
      setDetail(undefined);
    }
  }, [deleteState]);

  const columns: any = [
    {
      title: "STT",
      key: "index",
      render: (_: any, record: any, index: number) => {
        ++index;
        return index;
      },
      align: "center",
    },
    {
      title: "Tên sách",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Tác giả",
      dataIndex: "authorName",
      key: "authorName",
      align: "center",
    },
    {
      title: "Hạn mức",
      dataIndex: "borrowingDateLimit",
      key: "borrowingDateLimit",
      align: "center",
    },
    {
      title: "Thư viện",
      dataIndex: "bookcase",
      key: "bookcase",
      align: "center",
      render: (bookcase: any) => {
        return <div>{bookcase?.library.name}</div>;
      },
    },
    {
      title: "Tình trạng sách",
      key: "status",
      align: "center",
      render: (record: Book) => {
        const overdued = dayjs().diff(record.borrowRecord?.returnDate) > 0;
        return (
          <Tag
            color={
              record.status === BookStatus.AVAILABLE
                ? "green"
                : record.status === BookStatus.OVERDUE || overdued
                ? "red"
                : "yellow"
            }
          >
            {record.status === BookStatus.AVAILABLE
              ? "Đang trên kệ"
              : record.status === BookStatus.OVERDUE || overdued
              ? "Quá hạn"
              : "Đang mượn"}
          </Tag>
        );
      },
    },
    {
      title: "Ngày mượn",
      key: "status",
      align: "center",
      render: (record: Book) => {
        return record.borrowRecord && record.status !== BookStatus.AVAILABLE
          ? dayjs(record.borrowRecord?.borrowDate).format("DD/MM/YYYY")
          : "-";
      },
    },
    {
      title: "Ngày hẹn",
      key: "status",
      align: "center",
      render: (record: Book) => {
        return record.borrowRecord && record.status !== BookStatus.AVAILABLE
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
            <Button
              onClick={() => {
                router.push(`/dashboard/manage-books/${item?._id}`);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EyeOutlined />}
              style={{ color: token.colorPrimary }}
            />
            <Button
              onClick={() => {
                router.push(`/dashboard/manage-books/update/${item?._id}`);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EditOutlined style={{ color: token.colorPrimary }} />}
            />
            <Button
              type={"text"}
              danger
              shape={"circle"}
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Hành động này không thể hoàn tác!",
                  content: `Xác nhận xóa sách`,
                  okText: "Xóa",
                  cancelText: "Hủy",
                  onOk: () => {
                    deleteAction(item._id);
                  },
                });
              }}
            />
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <div className={"flex gap-8 justify-between mb-4"}>
        <div>
          <Input
            className={"bg-input-group-after"}
            placeholder={"Tìm kiếm..."}
            addonAfter={<SearchOutlined />}
          />
        </div>

        <div className={"flex justify-between"}>
          <Button
            type={"primary"}
            onClick={() => {
              router.push("/dashboard/manage-books/create");
            }}
          >
            Thêm sách
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={state.data}
        pagination={{
          total: state.totalDocs,
          pageSize: state.limit,
          current: state.page,
          pageSizeOptions: [10, 20, 30, 50, 100],
          showSizeChanger: true,
        }}
        onChange={(e) => {
          if (e.current && e.pageSize) {
            router.push(
              `${pathname}?${createQueryString({
                page: e.current,
                limit: e.pageSize,
              })}`
            );
            getData({ limit: e.pageSize, page: e.current });
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
        deleteAction={(arg: any) => {
          deleteAction(arg);
        }}
      />
    </div>
  );
}

export default ManageBook;
