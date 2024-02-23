"use client";
import ManageBorrowsHeader from "./components/ManageBorrowsHeader";
import {Avatar, Button, Card, Pagination, Table, theme, Typography} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";

import {useRouter} from "next/navigation";
import ViewBorrowModal from "./components/ViewBorrowModal";

const data = [
  {
    _id: '1',
    name: 'AnhLs',
    email: 'anhls@gmail.com',
    phoneNumber: '039882355',
    borrowDate: '02/02/2023',
    returnDate: '12/03/2023',
  },
  {
    _id: '2',
    name: 'John',
    email: 'john@gmail.com',
    phoneNumber: '039882311',
    borrowDate: '15/01/2023',
    returnDate: '22/01/2023',
  }
]

export default function ManageBorrows() {
  const router = useRouter();
  const {token} = theme.useToken();
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);

  const columns: any = [
    {
      title: 'Họ và tên',
      key: 'name',
      render: (item: any) => (
        <div className={'flex items-center gap-4'}>
          <Avatar>{item?.name.split('')[0]}</Avatar>
          <Typography.Text>{item?.name}</Typography.Text>
        </div>
      )
    },
    {
      title: 'ID bạn đọc',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'borrowDate',
      key: 'borrowDate',
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnDate',
      key: 'returnDate',
    },
    {
      title: 'Tác vụ',
      key: 'actions',
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
              router.push(`/dashboard/manage-borrows/${item?._id}`)
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
        <ManageBorrowsHeader/>
        <Button type={'primary'} onClick={() => {
          router.push('/dashboard/manage-borrows/create')
        }}>Thêm lượt mượn</Button>
      </div>
      <Card bodyStyle={{padding: 0}} bordered={false}>
        <Table
          className={'table-no-border-radius'}
          dataSource={data}
          columns={columns}
          pagination={false}
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