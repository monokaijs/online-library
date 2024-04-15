"use client";
import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import ManageAccountsHeader from "@/app/dashboard/manage-accounts/components/ManageAccountsHeader";
import ViewAccountModal from "@/app/dashboard/manage-accounts/components/ViewAccountModal";
import { useFormState } from "react-dom";
import { getAccountsAction } from "./action";
import { RoleEnum } from "@/lib/models/account.model";
import moment from "moment";

function ManageAccounts() {
  const [accountDetail, setAccountDetail] = useState<Account>();

  const [state, formAction] = useFormState(getAccountsAction, {
    accounts: [],
    limit: 20,
    page: 1,
    totalPages: 0,
    totalAccounts: 0,
  });

  useEffect(() => {
    formAction();
  }, []);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (_: any, record: any, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tuổi",
      dataIndex: "birthday",
      key: "birthday",
      render: (item: string) => moment().year() - moment(item).year(),
    },

    {
      title: "Ngày gia nhập",
      dataIndex: "joinDate",
      key: "joinDate",
      render: (item: string) => moment(item).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: AccountStatus) => {
        return (
          <Tag
            color={
              status === "banned"
                ? "black"
                : status === "verified"
                ? "green"
                : "red"
            }
          >
            {status?.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div>
      <ManageAccountsHeader />
      <Table
        columns={columns}
        dataSource={state.accounts}
        onRow={(record) => ({
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
      />
    </div>
  );
}

export default ManageAccounts;
