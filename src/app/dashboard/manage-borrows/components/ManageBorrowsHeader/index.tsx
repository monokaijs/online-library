"use client";
import {SearchOutlined} from "@ant-design/icons";
import {Input, Select} from "antd";

export default function ManageBorrowsHeader() {
  return (
    <div className={'flex gap-8'}>
      <div>
        <Input
          placeholder={'Tìm kiếm bạn đọc...'}
          addonAfter={<SearchOutlined/>}
        />
      </div>
      <Select
        defaultValue="name"
        style={{ width: 236 }}
        options={[
          { value: 'name', label: 'Tìm kiếm theo tên' },
        ]}
      />
    </div>
  )
}