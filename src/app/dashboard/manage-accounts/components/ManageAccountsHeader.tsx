"use client";
import useDebounce from "@/lib/hooks/useDebounce";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function ManageAccountsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
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
    createQueryString({ query: queryDebounce });
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
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="user">Bạn đọc</Select.Option>
          <Select.Option value="manager">Thủ thư</Select.Option>
          <Select.Option value="admin">Quản lý</Select.Option>
        </Select>
        <Input
          placeholder={"Tìm kiếm bạn đọc..."}
          allowClear
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
