import AccountForm from "@/app/dashboard/manage-accounts/(form)/components/AccountForm";
import { getAccountBySessionAction } from "@/app/dashboard/manage-accounts/action";
import { Modal, Spin } from "antd";
import { useEffect } from "react";
import { useFormState } from "react-dom";

interface EditProfileModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

export default function EditProfileModal(props: EditProfileModalProps) {
  const { isOpen, onCancel, onComplete } = props;

  const [state, getAccounts] = useFormState(getAccountBySessionAction, {
    success: false,
    account: undefined,
    message: "",
  });

  useEffect(() => {
    getAccounts({});
  }, []);

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      centered
      styles={{
        content: {
          padding: 0,
        },
      }}
      width={714}
    >
      {state?.account ? (
        <AccountForm account={state?.account as any} onComplete={onComplete} />
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <Spin />
        </div>
      )}
    </Modal>
  );
}
