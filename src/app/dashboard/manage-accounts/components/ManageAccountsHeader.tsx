"use client";
import { Button, Input, Select } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import { Option } from "antd/es/mentions";

function ManageAccountsHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const queryDebounce = useDebounce(query);
  const pathname = usePathname();

  const createQueryString = useCallback(
    (paramsToUpdate: any) => {
      const updatedParams = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToUpdate).forEach(([key, value]: any) => {
        if (value === null || value === undefined || value === "") {
          updatedParams.delete(key);
        } else {
          updatedParams.set(key, value);
        }
      });

      router.push(pathname + "?" + updatedParams.toString());
    },
    [searchParams]
  );

  useEffect(() => {
    createQueryString({ fullName: queryDebounce });
  }, [queryDebounce]);

  return (
    <div className={"flex justify-between mb-4"}>
      <div className={"flex gap-8"}>
        <Select
          style={{ minWidth: 100 }}
          defaultValue={searchParams.get("role") ?? "all"}
          onChange={(e) => {
            createQueryString({
              role: e == "all" ? "" : e,
            });
          }}
        >
          <Option value="all">Tất cả</Option>
          <Option value="user">Bạn đọc</Option>
          <Option value="manager">Thủ thư</Option>
          <Option value="admin">Quản lý</Option>
        </Select>
        <Input
          placeholder={"Tìm kiếm bạn đọc..."}
          addonAfter={<SearchOutlined />}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <Button
        type={"primary"}
        onClick={() => {
          router.push("/dashboard/manage-accounts/create");
        }}
      >
        Thêm người dùng
      </Button>
    </div>
  );
}

export default ManageAccountsHeader;
