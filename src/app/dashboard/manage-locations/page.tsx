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
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Thời gian mở cửa",
      key: "openingTime",
      align: "center",
      render: (item: Location) => dayjs(item.openingTime).format("HH:mm") + " - " + dayjs(item.closingTime).format("HH:mm"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
                router.push(`/dashboard/manage-locations/update/${item?._id}`);
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
      <ManageLocationsHeader />
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
