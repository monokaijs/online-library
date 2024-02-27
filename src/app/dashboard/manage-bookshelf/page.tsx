"use client";
import ManageBookshelfHeader from "./components/ManageBookshelfHeader";
import {Avatar, Button, Card, Pagination, Table, Tag, theme, Typography} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

import {useRouter} from "next/navigation";
import ViewBorrowModal from "./components/ViewBorrowModal";

const data = [
  {
    _id: '1',
    bookshelfId: 'A1',
    category: 'Kinh doanh',
    location: 'Cầu Giấy',
  },
  {
    _id: '1',
    bookshelfId: 'A2',
    category: 'Kinh doanh',
    location: 'Cầu Giấy',
  },
  {
    _id: '2',
    bookshelfId: 'A1',
    category: 'Tiểu sử - hồi ký',
    location: 'Thanh Xuân',
  },
]

export default function ManageBookshelf() {
  const router = useRouter();
  const {token} = theme.useToken();
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);

  const columns: any = [
    {
      title: 'Mã ngăn sách',
      key: 'name',
      dataIndex: 'bookshelfId',
      width: '15%',
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Cơ sở',
      key: 'location',
      dataIndex: 'location',
      render: (item:any) =>   <Tag>{item}</Tag>
    },
    {
      title: 'Tác vụ',
      key: 'actions',
      width: '15%',
      render: (item:any) => (
        <div className={'flex'}>
          <Button
            onClick={() => setIsOpenViewModal(true)}
            type={'text'}
            shape={'circle'}
            icon={<EyeOutlined/>}
            style={{color: token.colorPrimary}}/>
          <Button
            onClick={() => {
              router.push(`/dashboard/manage-bookshelf/${item?._id}`)
            }}
            type={'text'}
            shape={'circle'}
            icon={<EditOutlined style={{color: token.colorPrimary}}/>}/>
          <Button type={'text'} danger shape={'circle'} icon={<DeleteOutlined/>}/>
        </div>
      )
    },
  ]

  return (
    <div>
      <div className={'flex justify-between mb-4'}>
        <ManageBookshelfHeader/>
        <Button type={'primary'} onClick={() => {
          router.push('/dashboard/manage-bookshelf/create')
        }}>Thêm ngăn sách</Button>
      </div>
      <Card bodyStyle={{padding: 0}} bordered={false}>
        <Table
          className={'table-no-border-radius'}
          dataSource={data}
          columns={columns}
          pagination={false}
          rowSelection={{

          }}
        />
        <div className={'flex justify-center my-6'}>
          <Pagination pageSize={10} total={50}/>
        </div>
      </Card>
      <ViewBorrowModal
        isOpen={isOpenViewModal}
        onCancel={() => {
          setIsOpenViewModal(false);
        }}
      />
    </div>
  )
}