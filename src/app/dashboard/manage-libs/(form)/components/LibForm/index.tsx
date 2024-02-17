"use client";
import { Button, DatePicker, Form, Input, TimePicker, Typography, Radio, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function LibForm() {
	return <Form
		labelCol={{flex: '200px'}}
		labelAlign="left"
		labelWrap
	>
		<Form.Item>
			<div className={'flex gap-9 items-end'}>
				<img src="/images/default-avatar.png" alt="avatar"/>
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
		<Form.Item label={'Tên thư viện'}>
			<Input placeholder={'Tên thư viện'}/>
		</Form.Item>
		<Form.Item label={'Ngày thành lập'}>
			<DatePicker showTime/>
		</Form.Item>
		<Row gutter={18}>
			<Col xs={24} lg={12}>
				<Form.Item label={'Giờ mở cửa'}>
					<TimePicker style={{width: "100%"}}/>
				</Form.Item>
			</Col>
			<Col xs={24} lg={12}>
				<Form.Item label={'Giờ đóng cửa'}>
					<TimePicker style={{width: "100%"}}/>
				</Form.Item>
			</Col>
		</Row>
		<Form.Item label={'Số điện thoại'}>
			<Input placeholder={'Số điện thoại'}/>
		</Form.Item>
		<Form.Item label={'Địa chỉ'}>
			<Input.TextArea placeholder={'Địa chỉ thư viện'}/>
		</Form.Item>
		<Form.Item label={'Trạng thái'}>
			<Radio.Group value={'inActive'} options={[{
				label: 'Đang hoạt động',
				value: 'inActive'
			}, 'Tạm đóng cửa', 'Ngưng hoạt động']}/>
		</Form.Item>
		<div className={'flex justify-end'}>
			<div className={'flex gap-9'}>
				<Button>
					Hủy bỏ
				</Button>
				<Button type={'primary'}>
					Cập nhật
				</Button>
			</div>
		</div>
	</Form>;
}

export default LibForm;
