"use client";
import ManageAccountsHeader from "@/app/dashboard/manage-accounts/components/ManageAccountsHeader";
import ViewAccountModal from "@/app/dashboard/manage-accounts/components/ViewAccountModal";
import { SessionContext } from "@/components/shared/SessionContext";
import { RoleEnum } from "@/lib/models/account.model";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, message, theme } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import {
  deleteAccountAction,
  getAccountsAction,
} from "@/app/dashboard/manage-accounts/action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/lib/utils/toast";

function ManageAccounts() {
  const { token } = theme.useToken();
  const { account } = useContext(SessionContext);
  const [accountDetail, setAccountDetail] = useState<Account>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const [state, getAccounts] = useFormState(getAccountsAction, {
    accounts: [],
    limit: Number(searchParams.get("limit") ?? 20),
    page: Number(searchParams.get("page") ?? 1),
    totalPages: 0,
    totalDocs: 0,
  });

  const [deleteState, deleteAction] = useFormState(deleteAccountAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getAccounts(state);
  }, []);

  useEffect(() => {
    toast(deleteState);
    if (deleteState.success) {
      getAccounts(state);
      setAccountDetail(undefined);
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
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (item: string) => item ?? "Không rõ",
      align: "center",
    },
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    //   key: "_id",
    //   render: (_id: string) => _id.substring(0, 8) + "...",
    //   align: "center",
    // },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: string) =>
        role === RoleEnum.USER ? "Bạn đọc" : role.toUpperCase(),
      align: "center",
    },
    {
      title: "Thao tác",
      key: "role",
      render: (item: Account) => {
        return (
          <div
            className={"flex justify-center"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button
              onClick={() => {
                setAccountDetail(item);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EyeOutlined />}
              style={{ color: token.colorPrimary }}
            />
            <Button
              onClick={() => {
                router.push(`/dashboard/manage-accounts/update/${item?._id}`);
              }}
              type={"text"}
              shape={"circle"}
              icon={<EditOutlined style={{ color: token.colorPrimary }} />}
            />
            <Button
              type={"text"}
              danger
              disabled={account?._id == item._id}
              shape={"circle"}
              icon={<DeleteOutlined />}
              onClick={() => {
                Modal.confirm({
                  title: "Hành động này không thể hoàn tác!",
                  content: `Xác nhận xóa bạn đọc ${item.fullName}`,
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
      <ManageAccountsHeader />
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={state.accounts}
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
            getAccounts({ limit: e.pageSize, page: e.current });
          }
        }}
        onRow={(record: any) => ({
          onClick: () => {
            setAccountDetail(record);
          },
        })}
      />
      <ViewAccountModal
        isOpen={!!accountDetail}
        onCancel={() => {
          setAccountDetail(undefined);
        }}
        accountDetail={accountDetail}
        deleteAction={(agrs: string) => {
          deleteAction(agrs);
        }}
      />
    </div>
  );
}

export default ManageAccounts;
