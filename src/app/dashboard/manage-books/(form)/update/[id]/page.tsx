"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { getBookByIdAction } from "@/app/dashboard/manage-books/action";
import BookForm from "@/app/dashboard/manage-books/(form)/components/BookForm";
import { FormAction } from "@/constants/app.constant";
import { Spin } from "antd";

export default function UpdatePage() {
  const { id } = useParams();
  const [state, action] = useFormState(getBookByIdAction, {
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
    return <BookForm data={state?.data as any} action={FormAction.UPDATE} />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin />
    </div>
  );
}
