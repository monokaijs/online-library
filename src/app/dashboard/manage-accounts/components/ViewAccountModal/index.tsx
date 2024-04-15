"use client";
import { Badge, Button, Modal, Typography } from "antd";
import styles from "./ViewAccountModal.module.scss";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import moment from "moment";
import { useContext } from "react";
import { SessionContext } from "@/components/shared/SessionContext";

interface ViewAccountModalProps {
  isOpen: boolean;
  onCancel: () => void;
  accountDetail?: Account;
}

export default function ViewAccountModal(props: ViewAccountModalProps) {
  const { isOpen, onCancel, accountDetail } = props;
  const {account} = useContext(SessionContext);

  const router = useRouter();
  return (
    <Modal
      centered	
      className={styles.modal}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={640}
    >
      <div className={"flex gap-9 items-center"}>
        <img src="/images/default-user-avatar.png" alt="avatar" />
        <div className={styles.info}>
          <div>
            <Typography className={styles.label}>Bạn đọc</Typography>
            <Typography className={styles.title}>
              {accountDetail?.fullName}
            </Typography>
          </div>
        </div>
      </div>
      <div className={"flex gap-9 my-4"}>
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            router.push("/dashboard/manage-libs/1");
            onCancel();
          }}
        >
          Sửa tài khoản
        </Button>
        <Button danger disabled={account?._id == accountDetail?._id} icon={<DeleteOutlined />}>
          Xóa tài khoản
        </Button>
      </div>
      <ModalDetailInfo
        records={[
          {
            fieldName: "Giới tính",
            value: accountDetail?.gender ?? "Chưa có thông tin",
          },
          {
            fieldName: "Ngày tham gia",
            value: moment(accountDetail?.joinDate).format("DD/MM/YYYY"),
          },
          {
            fieldName: "Số điện thoại",
            value: accountDetail?.phoneNumber ?? "Chưa có thông tin",
          },
          {
            fieldName: "Số CCCD/CMD",
            value: accountDetail?.identityNumber ?? "Chưa có thông tin",
          },
          {
            fieldName: "Địa chỉ",
            value: accountDetail?.address ?? "Chưa có thông tin",
          },
        ]}
      />
    </Modal>
  );
}
