"use client";

import AccountForm from "@/app/dashboard/manage-accounts/(form)/components/AccountForm";
import { getAccountByIdAction } from "@/app/dashboard/manage-accounts/action";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function UpdatePage() {
  const { id } = useParams();
  const [state, getAccounts] = useFormState(getAccountByIdAction, {
    success: false,
    account: undefined,
    message: "",
  });

  useEffect(() => {
    if (id) {
      getAccounts(id.toString());
    }
  }, []);

  if (state?.account) {
    return <AccountForm account={state?.account as any} />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin />
    </div>
  );
}
