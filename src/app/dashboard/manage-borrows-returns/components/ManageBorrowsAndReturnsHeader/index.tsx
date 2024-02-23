"use client";
import {DownOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Input, Select} from "antd";
import {useRouter} from "next/navigation";

export default function ManageBorrowsAndReturnsHeader() {
  const router = useRouter();
  return <div className={'flex justify-between mb-4'}>
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
    <Button type={'primary'} onClick={() => {
      router.push('/dashboard/manage-borrows-returns/create')
    }}>
      Thêm bạn đọc
    </Button>
  </div>;
}