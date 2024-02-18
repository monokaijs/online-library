"use client";
import { Badge, Button, Col, Modal, Row, Typography } from "antd";
import styles from './ViewLibModal.module.scss';
import { CalendarOutlined, DeleteOutlined, EditOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";

interface ViewLibModalProps {
	isOpen: boolean;
	onCancel: () => void;
}

export default function ViewLibModal( props: ViewLibModalProps ) {
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
			<img src="/images/default-avatar.png" alt="avatar"/>
			<div className={styles.info}>
				<div>
					<Typography className={styles.label}>
						Thư viện
					</Typography>
					<Typography className={styles.title}>
						D Free Book Đại La
					</Typography>
				</div>
				<div className={styles.rangeTime}>
					<div>
						<Badge status="success" text={"08:00 A.M"}/>
					</div>
					<div>
						<Badge status="error" text={"09:00 P.M"}/>
					</div>
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
					icon: <CalendarOutlined/>,
					fieldName: 'Ngày thành lập:',
					value: '12/02/2020'
				},
				{
					icon: <PhoneOutlined/>,
					fieldName: 'Số điện thoại :',
					value: '031555648'
				},
				{
					icon: <HomeOutlined/>,
					fieldName: 'Địa chỉ :',
					value: '254 Hai Bà Trưng, Quận Hoàn Kiếm, P9, Tp. Hà Nội'
				}
			]}/>
	</Modal>;
}
