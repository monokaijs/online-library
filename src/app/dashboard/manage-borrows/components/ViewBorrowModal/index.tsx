"use client";
import {Avatar, Modal, Tag, Typography} from "antd";
import styles from './ViewBorrowModal.module.scss';
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {UserOutlined} from "@ant-design/icons";

interface ViewBorrowModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ViewBorrowModal(props: ViewBorrowModalProps) {
  const {isOpen, onCancel} = props;
  return <Modal
    className={styles.modal}
    open={isOpen}
    onCancel={onCancel}
    footer={null}
    width={640}
    centered
  >
    <ModalDetailInfo
      records={[
        {
          fieldName: 'Tên sách : ',
          value: (
            <div className={'flex gap-4 flex-wrap'}>
              <Tag style={{marginRight: 0}}>Đắc nhân tâm</Tag>
              <Tag style={{marginRight: 0}}>Cuộc sống không giới hạn</Tag>
            </div>
          ),
        },
        {
          fieldName: 'Người mượn : ',
          value: <div className={'flex items-center gap-2'}>
            <Avatar src={''} size={28} icon={<UserOutlined/>}/>
            <Typography.Text>AnhLs</Typography.Text>
          </div>,
        },
        {
          fieldName: 'Email :',
          value: 'anhls@gmail.com',
        },
        {
          fieldName: 'Điện thoại :',
          value: '0932234322',
        },
        {
          fieldName: 'Địa chỉ người nhận :',
          value: '254 Hai Bà Trưng, Quận Hoàn Kiếm, P9, Tp. Hà Nội',
        },
        {
          fieldName: 'Ngày mượn :',
          value: '12/02/2024',
        },
        {
          fieldName: 'Ngày trả :',
          value: 'Chưa có thông tin',
        },
        {
          fieldName: 'Vận chuyển :',
          value: 'Giao hàng tiết kiệm',
        },
        {
          fieldName: 'Ghi chú :',
          value: 'Chưa có thông tin',
        },
      ]}/>
  </Modal>;
}
