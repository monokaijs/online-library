"use client";
import { Badge, Button, Modal, Typography } from "antd";
import styles from './ViewAccountModal.module.scss';
import { CalendarOutlined, DeleteOutlined, EditOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";

interface ViewAccountModalProps {
	isOpen: boolean;
	onCancel: () => void;
}

export default function ViewAccountModal( props: ViewAccountModalProps ) {
	const {isOpen, onCancel} = props;
	const router = useRouter();
	return <Modal
		className={styles.modal}
		open={isOpen}
		onCancel={onCancel}
		footer={null}
		width={640}
	>
		<div className={'flex gap-9 items-center'}>
			<img src="/images/default-user-avatar.png" alt="avatar"/>
			<div className={styles.info}>
				<div>
					<Typography className={styles.label}>
						Bạn đọc
					</Typography>
					<Typography className={styles.title}>
						Lê Thị Thu Hà
					</Typography>
				</div>
			</div>
		</div>
		<div className={'flex gap-9 my-4'}>
			<Button icon={<EditOutlined/>} onClick={() => {
				router.push('/dashboard/manage-libs/1');
				onCancel();
			}
			}>
				Sửa thư viện
			</Button>
			<Button danger icon={<DeleteOutlined/>}>
				Xóa thư viện
			</Button>
		</div>
		<ModalDetailInfo
			records={[
				{
					fieldName: 'Giới tính:',
					value: 'Nữ'
				},
				{
					fieldName: 'Ngày tham gia :',
					value: '12/02/2024'
				},
				{
					fieldName: 'Số điện thoại :',
					value: '031555648'
				},
				{
					fieldName: 'Số CCCD/CMD :',
					value: 'Chưa có thông tin'
				},
				{
					fieldName: 'Địa chỉ :',
					value: '254 Hai Bà Trưng, Quận Hoàn Kiếm, P9, Tp. Hà Nội'
				}
			]}/>
	</Modal>;
}
