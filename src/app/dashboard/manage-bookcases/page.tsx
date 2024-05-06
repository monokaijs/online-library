"use client";
import {
  deleteBookcaseAction,
  getBookcaseAction,
} from "@/app/dashboard/manage-bookcases/action";
import { Bookcase } from "@/lib/models/bookcase.model";
import { toast } from "@/lib/utils/toast";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, theme } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ManageBookcasesHeader from "./components/ManageBookcasesHeader";
import ViewBookcaseModal from "./components/ViewBookcaseModal";

function ManageBookcases() {
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

  const [state, getBookcases] = useFormState(getBookcaseAction, {
    data: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const [deleteState, deleteAction] = useFormState(deleteBookcaseAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getBookcases(state);
  }, []);

  useEffect(() => {
    toast(deleteState);
    if (deleteState.success) {
      getBookcases(state);
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
      title: "Ngăn sách",
      dataIndex: "position",
      key: "position",
      align: "center",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      align: "center",
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
                setDetail(item);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EyeOutlined />}
              style={{ color: token.colorPrimary }}
            />
            <Button
              onClick={() => {
                router.push(`/dashboard/manage-bookcases/update/${item?._id}`);
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
                  content: `Xác nhận xóa tủ sách`,
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
      <ManageBookcasesHeader />
      <Table
        loading={state.data.length == 0}
        rowKey="_id"
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
            getBookcases({ limit: e.pageSize, page: e.current });
          }
        }}
        onRow={(record: any) => ({
          onClick: () => {
            setDetail(record);
          },
        })}
      />
      <ViewBookcaseModal
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

export default ManageBookcases;
