"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { Book, BookStatus } from "@/lib/models/book.model";
import { Bookcase } from "@/lib/models/bookcase.model";
import { toast } from "@/lib/utils/toast";
import {
  BookOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  theme,
} from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { deleteBookAction, getBookAction } from "./action";
import ViewBookModal from "./components/ViewBookModal";

function ManageBook() {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Bookcase>();
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query);

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

  const [deleteState, deleteAction] = useFormState(deleteBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    setLoading(true);
    getData({
      ...state,
      limit: Number(searchParams.get("limit") ?? 20),
      page: Number(searchParams.get("page") ?? 1),
      filter: {
        query: searchParams.get("name") ?? "",
        type: searchParams.get("type") ?? "",
      },
    });
  }, [pathname, searchParams]);

  useDidMountEffect(() => {
    setLoading(false);
  }, [state]);

  useDidMountEffect(() => {
    createQueryString({
      name: queryDebounce,
    });
  }, [queryDebounce]);

  useEffect(() => {
    toast(deleteState);
    if (deleteState.success) {
      getData(state);
      setDetail(undefined);
    }
  }, [deleteState]);

  const columns: any = [
    {
      title: searchParams.get("type") === "trending" ? "TOP" : "STT",
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
          dataIndex: "bookcase",
          key: "bookcase",
          align: "center",
          render: (bookcase: any) => {
            return <div>{bookcase?.library?.name}</div>;
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
            <Dropdown
              menu={{
                items: [
                  {
                    icon: <EyeOutlined />,
                    key: "view",
                    label: "Xem chi tiết",
                    onClick: () => {
                      router.push(`/dashboard/manage-books/${item?._id}`);
                    },
                  },
                  {
                    type: "divider",
                  },
                  {
                    icon: <EditOutlined />,
                    key: "edit",
                    label: "Cập nhật thông tin",
                    onClick: () => {
                      router.push(
                        `/dashboard/manage-books/update/${item?._id}`
                      );
                    },
                  },
                  {
                    key: "d",
                    type: "divider",
                  },
                  {
                    icon: <BookOutlined />,
                    key: "borrow",
                    label: "Tạo phiếu mượn",
                    onClick: () => {
                      router.push(
                        `/dashboard/manage-borrows/create?book=${item?._id}`
                      );
                    },
                    disabled: item.status !== BookStatus.AVAILABLE,
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
                          deleteAction(item._id);
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
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      {/* <Card className="mb-4">
        <Typography.Title className="ma-0" level={3}>Quản lý sách</Typography.Title>
      </Card> */}
      <div className={"flex gap-8 justify-between mb-4"}>
        <div className="flex gap-4">
          <Select
            defaultValue={searchParams.get("type") ?? "all"}
            style={{ minWidth: 150 }}
            onChange={(e) => {
              createQueryString({
                type: e === "all" ? "" : e,
              });
            }}
          >
            <Select.Option value="all">Tất cả sách</Select.Option>
            <Select.Option value="available">Sách trên kệ</Select.Option>
            <Select.Option value="trending">Sách trending</Select.Option>
            {/* <Option value="overdued">Sách quá hạn</Option> */}
          </Select>
          <Input
            className={"bg-input-group-after"}
            placeholder={"Tìm kiếm..."}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
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
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={state?.data}
        pagination={{
          total: state.totalDocs,
          pageSize: state.limit,
          current: state.page,
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
        deleteAction={(arg: any) => {
          deleteAction(arg);
        }}
      />
    </div>
  );
}

export default ManageBook;
