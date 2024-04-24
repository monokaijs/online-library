"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { getBookcaseByIdAction } from "@/app/dashboard/manage-bookcases/action";
import BookcaseForm from "@/app/dashboard/manage-bookcases/(form)/components/BookcaseForm";
import { FormAction } from "@/constants/app.constant";

export default function UpdatePage() {
  const { id } = useParams();
  const [state, action] = useFormState(getBookcaseByIdAction, {
    success: false,
    data: undefined,
    message: "",
  });

  useEffect(() => {
    if (id) {
      action(id.toString());
    }
  }, []);

  if (state.data) {
    return <BookcaseForm data={state.data as any} action={FormAction.UPDATE} />;
  }

  return <div>Loading...</div>;
}
