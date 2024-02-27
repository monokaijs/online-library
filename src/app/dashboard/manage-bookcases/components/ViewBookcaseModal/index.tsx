"use client";
import {Avatar, Modal, Tag, Typography} from "antd";
import styles from './ViewBookcaseModal.module.scss';
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {UserOutlined} from "@ant-design/icons";

interface ViewBookcaseModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ViewBookcaseModal(props: ViewBookcaseModalProps) {
  const {isOpen, onCancel} = props;
  return <Modal
    className={styles.modal}
    open={isOpen}
    onCancel={onCancel}
    footer={null}
    width={640}
  >
    <ModalDetailInfo
      records={[
        {
          fieldName: 'Mã ngăn sách : ',
          value: 'A1',
        },
        {
          fieldName: 'Thể loại : ',
          value: 'Kinh doanh',
        },
        {
          fieldName: 'Cơ sở :',
          value: 'Cầu Giấy',
        },
      ]}/>
  </Modal>;
}
