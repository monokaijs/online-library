"use client";
import {Button, Form, Input, Typography, Select, theme, Radio} from "antd";
import {FormAction} from "@/constants/app.constant";

interface BookcaseFormProps {
  action: FormAction;
}

function BookcaseForm(props: BookcaseFormProps) {
  const {action} = props;
  const {token: {colorPrimary}} = theme.useToken();

  return <Form
    labelCol={{flex: '200px'}}
    labelAlign="left"
    labelWrap
    className={'form-item-label-no-colon'}
  >
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Ngăn sách : </Typography.Text>}>
      <Input placeholder={'Mã ngăn sách'}/>
    </Form.Item>
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Thể loại : </Typography.Text>}>
      <Select
        className={'w-full'}
        placeholder={'Thể loại'}
        style={{width: 236}}
        options={[
          {value: '', label: 'Kinh tế'},
          {value: '', label: 'Đời sống'},
        ]}
      />
    </Form.Item>
    <Form.Item
      label={<Typography.Text style={{color: colorPrimary}}>Cơ sở : </Typography.Text>}>
      <Radio.Group>
        <Radio value={'1'}>Đại La</Radio>
        <Radio value={'2'}>Cầu Giấy</Radio>
      </Radio.Group>
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

export default BookcaseForm;
