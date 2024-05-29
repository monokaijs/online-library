"use client";

import { FormAction } from "@/constants/app.constant";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { getAccountBySessionAction } from "@/app/dashboard/manage-accounts/action";
import BorrowForm from "../components/BorrowForm";

export default function CreateBorrowPage() {
  const [state, getAccounts] = useFormState(getAccountBySessionAction, {
    success: false,
    account: undefined,
    message: "",
  });

  useEffect(() => {
    getAccounts({});
  }, []);

  if (state?.account) {
    return (
      <BorrowForm account={state?.account as any} action={FormAction.CREATE} />
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin />
    </div>
  );
}
