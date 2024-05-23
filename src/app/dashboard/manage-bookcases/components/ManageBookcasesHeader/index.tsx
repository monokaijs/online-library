"use client";
import { getLibraryAction } from "@/app/dashboard/manage-locations/action";
import useDebounce from "@/lib/hooks/useDebounce";
import { Location } from "@/lib/models/library.model";
import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function ManageBookcasesHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const queryDebounce = useDebounce(query);
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
    createQueryString({ query: queryDebounce });
  }, [queryDebounce]);

  return (
    <div className={"flex gap-8 justify-between mb-4"}>
      <div className="flex items-center gap-8">
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

        <Input
          placeholder={"Tìm kiếm tủ sách..."}
          allowClear
          addonAfter={<SearchOutlined />}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
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
