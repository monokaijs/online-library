"use client";
import {SearchOutlined} from "@ant-design/icons";
import {DatePicker, Input} from "antd";

export default function ManageBookshelfHeader() {
  return (
    <div className={'flex gap-8'}>
      <div >
        <Input
          className={'bg-input-group-after'}
          placeholder={'Tìm kiếm...'}
          addonAfter={<SearchOutlined/>}
        />
      </div>
      <DatePicker style={{width: 236}} />
    </div>
  )
}