"use client";

import { FormAction } from "@/constants/app.constant";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import BorrowForm from "../../components/BorrowForm";
import { getBorrowByIdAction } from "../../../action";

export default function UpdatePage() {
  const { id } = useParams();
  const [state, action] = useFormState(getBorrowByIdAction, {
    success: false,
    data: undefined,
    message: "",
  });

  useEffect(() => {
    if (id) {
      action(id.toString());
    }
  }, []);

  if (state?.data) {
    return <BorrowForm detail={state?.data as any} action={FormAction.UPDATE} />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin />
    </div>
  );
}
