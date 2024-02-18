"use client";
import { useState } from "react";
import { Button, Table } from "antd";
import ManageAccountsHeader from "@/app/dashboard/manage-accounts/components/ManageAccountsHeader";
import ViewAccountModal from "@/app/dashboard/manage-accounts/components/ViewAccountModal";

function ManageAccounts() {
	const [isOpenViewModal, setIsOpenViewModal] = useState(false);

	return <div>
		<ManageAccountsHeader/>
		<Button className={'mb-2'} onClick={() => {
			setIsOpenViewModal(true);
		}
		}>
			View UI
		</Button>
		<Table/>
		<ViewAccountModal
			isOpen={isOpenViewModal}
			onCancel={() => {
				setIsOpenViewModal(false);
			}}
		/>
	</div>;
}

export default ManageAccounts;
