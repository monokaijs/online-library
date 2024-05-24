"use client";
import { getLibraryAction } from "@/app/dashboard/manage-locations/action";
import { SessionContext } from "@/components/shared/SessionContext";
import useDebounce from "@/lib/hooks/useDebounce";
import { RoleEnum } from "@/lib/models/account.model";
import { Location } from "@/lib/models/library.model";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function ManageBookHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const queryDebounce = useDebounce(query);
  const { account } = useContext(SessionContext);
  const pathname = usePathname();

  const [libraries, getLibraries] = useFormState(getLibraryAction, {
    data: [],
    success: false,
  });

  useEffect(() => {
    getLibraries();
  }, []);

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
    createQueryString({ query: queryDebounce, page: undefined });
  }, [queryDebounce]);

  return (
    <div className={"flex gap-8 justify-between mb-4"}>
      <div className="flex gap-8">
        <Select
          style={{ minWidth: 150 }}
          defaultValue={searchParams.get("library") ?? "all"}
          onChange={(e) => {
            createQueryString({
              library: e == "all" ? "" : e,
            });
          }}
        >
          <Select.Option value="all">Thư viện</Select.Option>
          {libraries?.data?.map((item: Location) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          defaultValue={searchParams.get("type") ?? "all"}
          style={{ minWidth: 200 }}
          onChange={(e) => {
            createQueryString({
              type: e === "all" ? "" : e,
            });
          }}
        >
          <Select.Option value="all">Tất cả sách</Select.Option>
          <Select.Option value="available">Sách trên kệ</Select.Option>
          <Select.Option value="borrowing">Sách đang mượn</Select.Option>
          <Select.Option value="trending">Sách trending</Select.Option>
        </Select>
        <Input
          className={"bg-input-group-after"}
          placeholder={"Tìm kiếm..."}
          allowClear
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          addonAfter={<SearchOutlined />}
        />
      </div>

      {account?.role !== RoleEnum.USER && (
        <div className={"flex justify-between items-center gap-8"}>
          <Button icon={<UploadOutlined />}>Tải lên</Button>
          <Button
            type={"primary"}
            onClick={() => {
              router.push("/dashboard/manage-books/create");
            }}
          >
            Thêm sách
          </Button>
        </div>
      )}
    </div>
  );
}
