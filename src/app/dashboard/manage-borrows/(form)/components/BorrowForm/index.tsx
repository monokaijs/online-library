"use client";
import {Button, Form, Input, DatePicker, Typography, Row, Col, Select, Avatar, theme} from "antd";
import {BookOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
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

const books = [
  {
    _id: '1',
    name: 'Đắc nhân tâm',
    avatar: '',
  },
  {
    _id: '2',
    name: 'Cuộc sống không giới hạn',
    avatar: '',
  }
]

function BorrowForm(props: BorrowFormProps) {
  const {action} = props;
  const [borrowerId, setBorrowerId] = useState();
  const {token: {colorPrimary}} = theme.useToken();

  const borrower = borrowers?.find(item => item._id === borrowerId)
  return <Form
    labelCol={{flex: '200px'}}
    labelAlign="left"
    labelWrap
    className={'form-item-label-no-colon'}
  >
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Tên sách : </Typography.Text>}
      name={'book'}>
      <Select
        mode={'multiple'}
        showSearch
        className={'w-full'}
        placeholder={'Chọn sách'}
        filterOption={(input, option: any) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
      >
        {books.map(book => (
          <Select.Option
            label={book.name}
            key={book._id}
            value={book._id}
          >
            <div className={'flex items-center gap-4'}>
              <Avatar src={book.avatar} size={20} icon={<BookOutlined/>}/>
              <Typography.Text>{book.name}</Typography.Text>
            </div>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Người mượn : </Typography.Text>} name={'borrower'}>
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
          <Typography.Text><MailOutlined/> Email: {borrower?.email} : </Typography.Text>
        </Col>
        <Col xs={12}>
          <Typography.Text><PhoneOutlined/> Phone number: {borrower?.phoneNumber} : </Typography.Text>
        </Col>
      </Row>
    </div> : null}
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Địa chỉ : </Typography.Text>}>
      <Input.TextArea placeholder={'Địa chỉ người nhận'}/>
    </Form.Item>
    <Row gutter={18}>
      <Col xs={24} lg={12}>
        <Form.Item
          label={<Typography.Text style={{color: colorPrimary}}>Ngày mượn : </Typography.Text>}>
          <DatePicker style={{width: "100%"}}/>
        </Form.Item>
      </Col>
      <Col xs={24} lg={12}>
        <Form.Item
          label={<Typography.Text style={{color: colorPrimary}}>Ngày trả : </Typography.Text>}>
          <DatePicker style={{width: "100%"}}/>
        </Form.Item>
      </Col>
    </Row>
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Phương thức vận chuyển : </Typography.Text>}>
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
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Ghi chú : </Typography.Text>}>
      <Input.TextArea placeholder={'Ghi chú'}/>
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
