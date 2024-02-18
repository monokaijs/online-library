"use client";
import { Button, Form, Input, Typography, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function AccountForm() {
	return <Form
		labelCol={{flex: '200px'}}
		labelAlign="left"
		labelWrap
	>
		<Form.Item>
			<div className={'flex gap-9 items-end'}>
				<img src="/images/default-user-avatar.png" alt="avatar"/>
				<div>
					<Button icon={<UploadOutlined/>} type={'primary'}>
						Click to Upload
					</Button>
					<Typography className={'mt-2 color-gray_1'}>
						Ảnh có kích cỡ ít nhất 200x200 định dạng PNG hoặc JPG
					</Typography>
				</div>
			</div>
		</Form.Item>
		<Form.Item label={'Họ và tên'}>
			<Input placeholder={'Nguyễn Văn A'}/>
		</Form.Item>
		<Form.Item label={'Email'}>
			<Input placeholder={'example@gmail.com'}/>
		</Form.Item>
		<Form.Item label={'Số điện thoại'}>
			<Input placeholder={'Số điện thoại...'}/>
		</Form.Item>
		<Form.Item label={'Số CCCD/CMND'}>
			<Input placeholder={'Số CCCD/CMND...'}/>
		</Form.Item>
		<Form.Item label={'Giới tính'}>
			<Radio.Group value={'male'} options={[{
				label: 'Nam',
				value: 'male'
			}, 'Nữ', 'Khác']}/>
		</Form.Item>
		<Form.Item label={'Địa chỉ'}>
			<Input.TextArea placeholder={'Địa chỉ...'}/>
		</Form.Item>
		<div className={'flex justify-end'}>
			<div className={'flex gap-9'}>
				<Button>
					Hủy bỏ
				</Button>
				<Button type={'primary'}>
					Thêm bạn đọc
				</Button>
			</div>
		</div>
	</Form>;
}

export default AccountForm;
