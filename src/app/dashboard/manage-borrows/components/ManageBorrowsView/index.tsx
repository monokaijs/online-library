import styles from "@/app/dashboard/manage-libs/components/ViewLibModal/ViewLibModal.module.scss";
import {Modal} from "antd";

interface ViewLibModalProps {
  isOpen: boolean;
  onCancel: () => void;
}


export default function ManageBorrowsView(props: ViewLibModalProps){
  const {isOpen, onCancel} = props;

  return (
    <Modal
      className={styles.modal}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={640}
    > 123</Modal>
  )
}