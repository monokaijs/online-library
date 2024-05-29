"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { useDisclosure } from "@/lib/hooks/useDisclosure";
import { Book } from "@/lib/models/book.model";
import { Borrow, BorrowStatus, PaymentStatus } from "@/lib/models/borrow.model";
import { Location } from "@/lib/models/library.model";
import { fineCaculate } from "@/lib/utils/fineCaculate";
import { getDaysDiff } from "@/lib/utils/getDaysDiff";
import { toast } from "@/lib/utils/toast";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
  theme,
} from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { getLibraryAction } from "../manage-locations/action";
import { deleteBorrowAction, getBorrowAction, payFineAction } from "./action";
import BorrowDetail from "./components/BorrowDetail";
import EditBorrow from "./components/EditBorrrow";

function ManageFines() {
  const { token } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Borrow>();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const queryDebounce = useDebounce(query);
  const editModal = useDisclosure();
  const viewDetailModal = useDisclosure();
  const {
    token: { colorPrimary },
  } = theme.useToken();

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

  const [payState, payFine] = useFormState(payFineAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    toast(payState);
    loadData();
  }, [payState]);

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
        paymentStatus: searchParams.get("paymentStatus") ?? "",
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
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Quá hẹn",
      key: "returnDate",
      align: "center",
      render: (item: Borrow) => getDaysDiff(item).label,
    },
    {
      title: "Tiền phạt",
      key: "returnDate",
      align: "center",
      render: (item: Borrow) =>
        item.hashFineAmount != undefined ? (
          <Typography.Text style={{ color: colorPrimary }}>
            {item.hashFineAmount
              ?.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
              ?.replace("VND", "đ")}
          </Typography.Text>
        ) : (
          fineCaculate(item).label
        ),
    },
    {
      title: "Trạng thái",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
      align: "center",
      render: (item: string) =>
        item === PaymentStatus.PAID ? (
          <Tag color="green">Đã nộp</Tag>
        ) : (
          <Tag color="orange">Chưa nộp</Tag>
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
                    label: (
                      <div>
                        {item.status === BorrowStatus.BORROWING ? (
                          <Tooltip title="Vui lòng hoàn thành lượt mượn">
                            Đã thu tiền
                          </Tooltip>
                        ) : (
                          "Đã thu tiền"
                        )}
                      </div>
                    ),
                    onClick: () => {
                      Modal.confirm({
                        title: "Hành động này không thể hoàn tác!",
                        content: `Hoàn thành phiếu phạt`,
                        okText: "Xác nhận",
                        cancelText: "Hủy",
                        onOk: () => {
                          payFine(item._id);
                        },
                      });
                    },
                    disabled:
                      item.status === BorrowStatus.BORROWING ||
                      item.paymentStatus === PaymentStatus.PAID,
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

                      viewDetailModal.onOpen();
                    },
                  },
                  {
                    type: "divider",
                  },
                  {
                    icon: <EditOutlined />,
                    key: "edit",
                    label: "Sửa phiếu phạt",
                    onClick: () => {
                      setDetail(item);
                      editModal.onOpen();
                    },
                    disabled: item.paymentStatus === PaymentStatus.PAID,
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
                            Xóa phiếu phạt
                          </Tooltip>
                        ) : (
                          "Xóa phiếu phạt"
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
                paymentStatus: e == "all" ? "" : e,
              });
            }}
          >
            <Select.Option value="all">Tất cả</Select.Option>
            <Select.Option value="paid">Đã nộp</Select.Option>
            <Select.Option value="unpaid">Chưa nộp</Select.Option>
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
            viewDetailModal.onOpen();
          },
        })}
      />
      <BorrowDetail
        isOpen={viewDetailModal.isOpen}
        onCancel={() => {
          setDetail(undefined);
          viewDetailModal.onClose();
        }}
        detail={detail}
        deleteAction={(arg: any) => {
          deleteAction(arg);
        }}
        loadData={loadData}
      />
      <EditBorrow
        isOpen={editModal.isOpen}
        onCancel={() => {
          setDetail(undefined);
          editModal.onClose();
        }}
        detail={detail}
        loadData={loadData}
      />
    </div>
  );
}

export default ManageFines;
