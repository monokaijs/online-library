"use client";
import {Button, DatePicker, Form, Input, TimePicker, Typography, Radio, Row, Col, Select, Space, Avatar} from "antd";
import {MailOutlined, PhoneOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import {FormAction} from "@/constants/app.constant";
import {useState} from "react";

interface BorrowFormProps {
  action: FormAction;
}

const borrowers = [
  {
    _id: '1',
    name: 'AnhLs',
    avatar: '',
    email: 'anhls@gmail.com',
    phoneNumber: '0398872244'
  },
  {
    _id: '2',
    name: 'John',
    avatar: '',
    email: 'john@gmail.com',
    phoneNumber: '098872455'
  }
]

function BorrowForm(props: BorrowFormProps) {
  const {action} = props;
  const [borrowerId, setBorrowerId] = useState();

  const borrower = borrowers?.find(item => item._id === borrowerId)
  return <Form
    labelCol={{flex: '200px'}}
    labelAlign="left"
    labelWrap
  >
    <Form.Item label={'Người mượn'} name={'borrower'}>
      <Select
        showSearch
        className={'w-full'}
        placeholder={'Người mượn'}
        filterOption={(input, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        onSelect={(e) => setBorrowerId(e)}
      >
        {borrowers.map(user => (
          <Select.Option
            label={user.name}
            key={user._id}
            value={user._id}
          >
            <div className={'flex items-center gap-4'}>
              <Avatar src={user.avatar} size={22} icon={<UserOutlined/>}/>
              <Typography.Text>{user.name}</Typography.Text>
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    {borrowerId ? <div style={{margin: '-12px 0 20px 200px'}}>
      <Row>
        <Col xs={12}>
          <Typography.Text><MailOutlined/> Email: {borrower?.email}</Typography.Text>
        </Col>
        <Col xs={12}>
          <Typography.Text><PhoneOutlined/> Phone number: {borrower?.phoneNumber}</Typography.Text>
        </Col>
      </Row>
    </div> : null}

    <Form.Item label={'Ngày mượn'} name={'borrowDate'}>
      <DatePicker showTime/>
    </Form.Item>
    <Form.Item label={'Ghi chú'} name={'address'}>
      <Input.TextArea placeholder={'Ghi chú'}/>
    </Form.Item>
    <Form.Item name={'delivery'} label={'Phương thức vận chuyển'}>
      <Select
        className={'w-full'}
        placeholder={'Vận chuyển'}
        style={{width: 236}}
        options={[
          {value: '', label: 'Giao hàng tiết kiệm'},
          {value: '', label: 'Giao hàng nhanh'},
        ]}
      />
    </Form.Item>
    <Form.Item label={'Địa chỉ'}>
      <Input.TextArea placeholder={'Địa chỉ người mượn'}/>
    </Form.Item>
    <div className={'flex justify-end'}>
      <div className={'flex gap-9'}>
        <Button>
          Hủy bỏ
        </Button>
        <Button type={'primary'}>
          {FormAction.CREATE === action ? ' Thêm' : 'Cập nhật'}
        </Button>
      </div>
    </div>
  </Form>;
}

export default BorrowForm;
