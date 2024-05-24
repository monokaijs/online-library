"use client";
import ModalDetailInfo from "@/app/dashboard/components/ModalDetailInfo";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Badge, Button, Modal, Typography } from "antd";
import { useRouter } from "next/navigation";
import styles from "./ViewLibModal.module.scss";
import dayjs from "dayjs";

interface ViewLocationModal {
  isOpen: boolean;
  onCancel: () => void;
  detail: any;
  deleteAction: any;
}

export default function ViewLocationModal(props: ViewLocationModal) {
  const { isOpen, onCancel, detail } = props;
  const router = useRouter();
  return (
    <Modal
      className={styles.modal}
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={640}
    >
      <div className={"flex gap-9 items-center"}>
        <img src="/images/default-avatar.png" alt="avatar" />
        <div className={styles.info}>
          <div>
            <Typography className={styles.label}>Thư viện</Typography>
            <Typography className={styles.title}>{detail?.name}</Typography>
          </div>
          <div className={styles.rangeTime}>
            <div>
              <Badge
                status="success"
                text={dayjs(detail?.openingTime).format("HH:mm")}
              />
            </div>
            <div>
              <Badge
                status="error"
                text={dayjs(detail?.closingTime).format("HH:mm")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-4">
        <ModalDetailInfo
          records={[
            {
              icon: <PhoneOutlined />,
              fieldName: "Số điện thoại",
              value: detail?.phoneNumber,
            },
            {
              icon: <HomeOutlined />,
              fieldName: "Địa chỉ",
              value: detail?.address,
            },
          ]}
        />
      </div>
    </Modal>
  );
}
