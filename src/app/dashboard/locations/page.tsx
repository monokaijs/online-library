"use client";
import { deleteBookcaseAction } from "@/app/dashboard/manage-bookcases/action";
import { Location } from "@/lib/models/library.model";
import { toast } from "@/lib/utils/toast";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Modal, Table, theme } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { deleteLibraryAction, getLibraryAction } from "./action";
import ManageLocationsHeader from "./components/ManageLocationsHeader";
import ViewLocationModal from "./components/ViewLocationModal";
import dayjs from "dayjs";

function ManageLocations() {
  const { token } = theme.useToken();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [detail, setDetail] = useState<Location>();

  const [state, getLibrary] = useFormState(getLibraryAction, {
    success: false,
    data: undefined,
    message: "",
  });

  const [deleteState, deleteAction] = useFormState(deleteLibraryAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    toast(deleteState);
    if (deleteState?.success) {
      getLibrary();
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
      title: "Cơ sở",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (item: string) =>
        item === "opening"
          ? "Đang hoạt động"
          : item === "temporary_closed"
          ? "Đang bảo trì"
          : "Dừng hoạt động",
    },
    {
      title: "Thời gian mở cửa",
      key: "openingTime",
      align: "center",
      render: (item: Location) =>
        dayjs(item.openingTime).format("HH:mm") +
        " - " +
        dayjs(item.closingTime).format("HH:mm"),
    },
  ];

  return (
    <div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={state?.data}
        onRow={(record: any) => ({
          onClick: () => {
            setDetail(record);
          },
        })}
      />
      <ViewLocationModal
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

export default ManageLocations;
