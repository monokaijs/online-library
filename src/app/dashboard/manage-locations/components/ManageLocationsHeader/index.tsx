"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";

export default function ManageLocationsHeader() {
  const router = useRouter();

  return (
    <div className={"flex gap-8 justify-between mb-4"}>
      <div>
        {/* <Input
          className={"bg-input-group-after"}
          placeholder={"Tìm kiếm..."}
          addonAfter={<SearchOutlined />}
        /> */}
      </div>

      <div className={"flex justify-between"}>
        <Button
          type={"primary"}
          onClick={() => {
            router.push("/dashboard/manage-locations/create");
          }}
        >
          Thêm thư viện
        </Button>
      </div>
    </div>
  );
}
