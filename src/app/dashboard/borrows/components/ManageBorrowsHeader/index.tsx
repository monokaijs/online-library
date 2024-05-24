"use client";
import {SearchOutlined} from "@ant-design/icons";
import {Input, Select} from "antd";

export default function ManageBorrowsHeader() {
  return (
    <div className={'flex gap-8'}>
      <div>
        <Input
          className={'bg-input-group-after'}
          placeholder={'Tìm kiếm...'}
          allowClear
          addonAfter={<SearchOutlined/>}
        />
      </div>
      <Select
        defaultValue="name"
        style={{ width: 236 }}
        options={[
          { value: 'name', label: 'Tìm kiếm theo tên' },
          { value: 'book', label: 'Tìm kiếm theo sách' },
        ]}
      />
    </div>
  )
}