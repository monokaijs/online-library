"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Location } from "@/lib/models/library.model";
import { toast } from "@/lib/utils/toast";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Modal,
  Select,
  Table,
  Tooltip,
  theme,
} from "antd";
import dayjs from "dayjs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getLibraryAction } from "../manage-locations/action";
import {
  acceptBorrowAction,
  cancelBorrowAction,
  deleteBorrowAction,
  getBorrowAction,
  returnBookAction,
} from "./action";
import BorrowDetail from "./components/BorrowDetail";
import Status from "./components/BorrowStatus";

function ManageBorrow() {
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Borrow>();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const queryDebounce = useDebounce(query);

  useEffect(() => {
    createQueryString({ query: query, page: undefined });
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

  const [returnState, returnBook] = useFormState(returnBookAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(returnState);
    loadData();
  }, [returnState]);

  const [accept, acceptBorrow] = useFormState(acceptBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(accept);
    loadData();
  }, [accept]);

  const [cancel, cancelBorrow] = useFormState(cancelBorrowAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(cancel);
    loadData();
  }, [cancel]);

  useEffect(() => {
    getLibraries();
  }, []);

  const loadData = () => {
    getData({
      ...state,
      limit: Number(searchParams.get("limit") ?? 20),
      page: Number(searchParams.get("page") ?? 1),
      filter: {
        query: searchParams.get("query") ?? "",
        status: searchParams.get("status") ?? "",
        library: searchParams.get("library") ?? "",
        month: searchParams.get("month"),
        year: searchParams.get("year"),
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [searchParams, pathname]);

  useDidMountEffect(() => {
    setLoading(false);
  }, [state]);

  useEffect(() => {
    toast(deleteState);
    if (deleteState?.success) {
      loadData();
      setDetail(undefined);
    }
  }, [deleteState]);

  const columns: any = [
    {
      title: "STT",
      key: "index",
      render: (_: any, record: any, index: number) => {
        ++index;
        return index + (state.page - 1) * state.limit;
      },
      align: "center",
    },
    {
      title: "Tên sách",
      dataIndex: "book",
      key: "name",
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
        const items: any = [
          {
            icon: <CheckCircleOutlined />,
            key: "done",
            label: "Hoàn tất",
            onClick: () => {
              Modal.confirm({
                title: "Hành động này không thể hoàn tác!",
                content: `Hoàn thành lượt mượn`,
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => {
                  returnBook(item._id);
                },
              });
            },
            disabled: item.status !== BorrowStatus.BORROWING,
          },
          {
            icon: <CheckCircleOutlined />,
            key: "accept",
            label: "Phê duyệt",
            onClick: () => {
              Modal.confirm({
                title: "Hành động này không thể hoàn tác!",
                content: `Phê duyệt lượt mượn này`,
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => {
                  acceptBorrow(item._id);
                },
              });
            },
            disabled: item.status !== BorrowStatus.PENDING,
          },
          {
            icon: <CloseCircleOutlined />,
            key: "cancel",
            label: "Từ chối",
            onClick: () => {
              Modal.confirm({
                title: "Hành động này không thể hoàn tác!",
                content: `Từ chối lượt mượn này`,
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => {
                  cancelBorrow(item._id);
                },
              });
            },
            disabled: item.status !== BorrowStatus.PENDING,
          },
          {
            icon: <EyeOutlined />,
            key: "view",
            label: "Xem chi tiết",
            onClick: () => {
              setDetail(item);
              // router.push(`/dashboard/manage-borrows/${item?._id}`);
            },
          },
          {
            icon: <EditOutlined />,
            key: "edit",
            label: "Cập nhật thông tin",
            onClick: () => {
              router.push(`/dashboard/manage-borrows/update/${item?._id}`);
            },
            disabled:
              item.status !== BorrowStatus.BORROWING &&
              item.status !== BorrowStatus.PENDING,
          },
          {
            icon: <DeleteOutlined />,
            key: "delete",
            label: (
              <div>
                {item.status === BorrowStatus.BORROWING ? (
                  <Tooltip title="Vui lòng hoàn thành lượt mượn">
                    Xóa phiếu mượn
                  </Tooltip>
                ) : (
                  "Xóa phiếu mượn"
                )}
              </div>
            ),
            onClick: () => {
              Modal.confirm({
                title: "Hành động này không thể hoàn tác!",
                content: `Xác nhận xóa phiếu mượn`,
                okText: "Xóa",
                cancelText: "Hủy",
                onOk: () => {
                  deleteAction(item._id);
                },
              });
            },
            disabled:
              item.status === BorrowStatus.BORROWING ||
              item.status === BorrowStatus.PENDING,
          },
        ];

        function insertBetween(array: any, element: any) {
          return array.reduce((acc: any, current: any, index: any) => {
            if (index < array.length - 1) {
              return acc.concat(current, element);
            } else {
              return acc.concat(current);
            }
          }, []);
        }

        const dropdownItems = items.filter((item: any) => !item.disabled);

        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Dropdown
              menu={{
                items: insertBetween(dropdownItems, {
                  type: "divider",
                }),
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
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
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
            <Select.Option value="overdue">Quá hạn</Select.Option>
            <Select.Option value="pending">Đang chờ</Select.Option>
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

        <div className={"flex justify-between gap-8"}>
          <DatePicker
            format={"MM/YYYY"}
            picker="month"
            placeholder="Chọn tháng"
            onChange={(e) => {
              if (e) {
                createQueryString({
                  month: (e?.month() ?? 0) + 1,
                  year: e?.year(),
                });
              } else {
                createQueryString({
                  month: undefined,
                  year: undefined,
                });
              }
            }}
          />
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
            // router.push(`/dashboard/manage-borrows/${record?._id}`);
            setDetail(record);
          },
        })}
      />
      {/* <ViewBorrowModal
        isOpen={!!detail}
        onCancel={() => {
          setDetail(undefined);
        }}
        detail={detail}
        deleteAction={(arg: any) => {
          deleteAction(arg);
        }}
      /> */}
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
          loadData();
        }}
      />
    </div>
  );
}

export default ManageBorrow;
