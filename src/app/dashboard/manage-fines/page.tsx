"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus } from "@/lib/models/borrow.model";
import { Location } from "@/lib/models/library.model";
import { toast } from "@/lib/utils/toast";
import {
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Modal,
  Popover,
  Select,
  Table,
  Tag,
  Tooltip,
  theme,
} from "antd";
import dayjs from "dayjs";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getLibraryAction } from "../manage-locations/action";
import {
  deleteBorrowAction,
  getBorrowAction,
  returnBookAction,
} from "./action";
import Status from "./components/BorrowStatus";
import ViewBorrowModal from "./components/ViewBorrowModal";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import BorrowDetail from "../manage-borrows/components/BorrowDetail";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";

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
        type: searchParams.get("type") ?? "",
        library: searchParams.get("library") ?? "",
        month: searchParams.get("month"),
        year: searchParams.get("year"),
        overdue: true,
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
      title: "Tên bạn đọc",
      dataIndex: "user",
      key: "user",
      render: (item: Account) => item?.fullName,
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
      render: (library: Location) => library?.name,
    },
    // {
    //   title: "Thư viện",
    //   dataIndex: "library",
    //   key: "library",
    //   align: "center",
    //   render: (item: Location) => item?.name,
    // },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
      // render: ({ library }: { library: Library }) => {
      //   return <div>{library.name}</div>;
      // },
    },
    // {
    //   title: "Ngày mượn",
    //   dataIndex: "borrowDate",
    //   key: "borrowDate",
    //   align: "center",
    //   render: (item: string) => dayjs(item).format("DD/MM/YYYY"),
    // },
    // {
    //   title: "Ngày hẹn",
    //   dataIndex: "returnDate",
    //   key: "returnDate",
    //   align: "center",
    //   render: (item: string) => dayjs(item).format("DD/MM/YYYY"),
    // },
    // {
    //   title: "Ngày trả thực tế",
    //   dataIndex: "realReturnDate",
    //   key: "realReturnDate",
    //   align: "center",
    //   render: (item: string) =>
    //     !!item ? dayjs(item).format("DD/MM/YYYY") : "-",
    // },
    {
      title: "Quá hẹn",
      key: "returnDate",
      align: "center",
      render: (item: Borrow) => {
        if (item.status === BorrowStatus.BORROWING) {
          return Math.abs(getDaysDiff(item?.returnDate)) + " ngày";
        } else {
          return (
            Math.abs(getDaysDiff(item.returnDate, item.realReturnDate)) +
            " ngày"
          );
        }
      },
    },
    {
      title: "Tiền phạt",
      key: "returnDate",
      align: "center",
      render: (item: Borrow) => {
        const days = Math.abs(
          getDaysDiff(item.returnDate, item.realReturnDate)
        );
        let amount = 0;
        if (days < 15) {
          amount = 1000;
        } else if (days < 50) {
          amount = 15000;
        } else if (days < 100) {
          amount = 20000;
        } else {
          amount = 25000;
        }

        return (days * amount)
          ?.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })
          ?.replace("VND", "đ");
      },
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      align: "center",
      render: (item: string) =>
        item === BorrowStatus.BORROWING ? (
          <Tag color="orange">Chưa thu</Tag>
        ) : (
          <Tag color="green">Đã thu</Tag>
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (item: any) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Dropdown
              menu={{
                items: [
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
                    type: "divider",
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
                    type: "divider",
                  },
                  {
                    icon: <EditOutlined />,
                    key: "edit",
                    label: "Cập nhật thông tin",
                    onClick: () => {
                      router.push(
                        `/dashboard/manage-borrows/update/${item?._id}`
                      );
                    },
                    disabled: item.status !== BorrowStatus.BORROWING,
                  },
                  {
                    key: "d",
                    type: "divider",
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
                    disabled: item.status === BorrowStatus.BORROWING,
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
                type: e == "all" ? "" : e,
              });
            }}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="overdue">Đã thu</Select.Option>
            <Select.Option value="borrowing">Chưa thu</Select.Option>
          </Select>
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
        </div>
        <div className={"flex justify-between gap-8"}>
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
        loadData={loadData}
      />
    </div>
  );
}

export default ManageBook;
