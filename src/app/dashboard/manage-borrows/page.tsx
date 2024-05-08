"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Location } from "@/lib/models/library.model";
import { toast } from "@/lib/utils/toast";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, theme } from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getLibraryAction } from "../manage-locations/action";
import { deleteBorrowAction, getBorrowAction } from "./action";
import Status from "./components/BorrowStatus";
import ViewBorrowModal from "./components/ViewBorrowModal";

function ManageBook() {
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Borrow>();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const queryDebounce = useDebounce(query);

  useEffect(() => {
    createQueryString({ query: query });
  }, [queryDebounce]);

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

  const [state, getData] = useFormState(getBorrowAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const [libraries, getLibraries] = useFormState(getLibraryAction, {
    data: [],
    success: false,
  });

  const [deleteState, deleteAction] = useFormState(deleteBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getLibraries();
  }, []);

  useEffect(() => {
    setLoading(true);
    getData({
      ...state,
      limit: Number(searchParams.get("limit") ?? 20),
      page: Number(searchParams.get("page") ?? 1),
      filter: {
        query: searchParams.get("query") ?? "",
        status: searchParams.get("status") ?? "",
        library: searchParams.get("library") ?? "",
      },
    });
  }, [searchParams, pathname]);

  useEffect(() => {
    setLoading(false);
  }, [state]);

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
      dataIndex: "book",
      key: "name",
      align: "center",
      render: (item: Book) => item?.name,
    },
    {
      title: "Thư viện",
      dataIndex: "library",
      key: "library",
      align: "center",
      render: (item: Location) => item?.name,
    },
    {
      title: "Tên bạn đọc",
      dataIndex: "user",
      key: "user",
      align: "center",
      render: (item: Account) => item?.fullName,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      // render: ({ library }: { library: Library }) => {
      //   return <div>{library.name}</div>;
      // },
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrowDate",
      key: "borrowDate",
      align: "center",
      render: (item: string) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày hẹn",
      dataIndex: "returnDate",
      key: "returnDate",
      align: "center",
      render: (item: string) => dayjs(item).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      key: "status",
      align: "center",
      render: (record: Borrow) => <Status data={record} />,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (item: any) => {
        const borrowing = item.status === BorrowStatus.BORROWING;
        return (
          <div
            className={"flex justify-center"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button
              onClick={() => {
                router.push(`/dashboard/manage-borrows/${item?._id}`);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EyeOutlined />}
              style={{ color: token.colorPrimary }}
            />
            <Button
              disabled={!borrowing}
              onClick={() => {
                router.push(`/dashboard/manage-borrows/update/${item?._id}`);
              }}
              type={"text"}
              shape={"circle"}
              icon={
                <EditOutlined
                  style={{ color: borrowing ? token.colorPrimary : "" }}
                />
              }
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
        <div className="flex gap-8">
          <Select
            style={{ minWidth: 150 }}
            defaultValue={searchParams.get("library") ?? "all"}
            onChange={(e) => {
              createQueryString({
                library: e == "all" ? "" : e,
              });
            }}
          >
            <Select.Option value="all">Thư viện</Select.Option>
            {libraries?.data?.map((item: Location) => (
              <Select.Option value={item._id}>{item.name}</Select.Option>
            ))}
          </Select>
          <Select
            style={{ minWidth: 150 }}
            defaultValue={searchParams.get("status") ?? "all"}
            onChange={(e) => {
              createQueryString({
                status: e == "all" ? "" : e,
              });
            }}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="borrowing">Đang mượn</Select.Option>
            <Select.Option value="returned">Đã trả</Select.Option>
            <Select.Option value="ovedued">Quá hạn</Select.Option>
          </Select>
          <Input
            className={"bg-input-group-after"}
            placeholder={"Nhập tên sách, bạn đọc..."}
            addonAfter={<SearchOutlined />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        <div className={"flex justify-between"}>
          <Button
            type={"primary"}
            onClick={() => {
              router.push(`/dashboard/manage-borrows/create`);
            }}
          >
            Thêm phiếu mượn
          </Button>
        </div>
      </div>
      <Table
        loading={loading}
        rowKey="_id"
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
            router.push(`/dashboard/manage-borrows/${record?._id}`);
            // setDetail(record);
          },
        })}
      />
      <ViewBorrowModal
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
