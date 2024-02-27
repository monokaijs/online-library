"use client";
import { Modal} from "antd";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";

interface ViewBookcaseModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function ViewBookcaseModal(props: ViewBookcaseModalProps) {
  const {isOpen, onCancel} = props;
  return <Modal
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
