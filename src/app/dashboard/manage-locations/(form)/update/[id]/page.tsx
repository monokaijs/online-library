"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { getBookcaseByIdAction } from "@/app/dashboard/manage-bookcases/action";
import LocationForm from "@/app/dashboard/manage-locations/(form)/components/LocationForm";
import { FormAction } from "@/constants/app.constant";
import { Spin } from "antd";
import { getLibraryByIdAction } from "../../../action";

export default function UpdatePage() {
  const { id } = useParams();
  const [state, action] = useFormState(getLibraryByIdAction, {
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
    return <LocationForm data={state?.data as any} action={FormAction.UPDATE} />;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Spin />
    </div>
  );
}
