"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input } from "antd";
import { useRouter } from "next/navigation";

export default function ManageBookcasesHeader() {
  const router = useRouter();

  return (
    <div className={"flex gap-8 justify-between mb-4"}>
      <div>
        <Input
          className={"bg-input-group-after"}
          placeholder={"Tìm kiếm..."}
          addonAfter={<SearchOutlined />}
        />
      </div>

      <div className={"flex justify-between"}>
        <Button
          type={"primary"}
          onClick={() => {
            router.push("/dashboard/manage-bookcases/create");
          }}
        >
          Thêm tủ sách
        </Button>
      </div>
    </div>
  );
}
