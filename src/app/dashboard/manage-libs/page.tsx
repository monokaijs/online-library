"use client";
import { Button, Table } from "antd";
import ManageLibsHeader from "@/app/dashboard/manage-libs/components/ManageLibsHeader";
import { useState } from "react";
import ViewLibModal from "@/app/dashboard/manage-libs/components/ViewLibModal";

function ManageLibs() {
	const [isOpenViewModal, setIsOpenViewModal] = useState(false);

	return <div>
		<ManageLibsHeader/>
		<Button className={'mb-2'} onClick={() => {
			setIsOpenViewModal(true);
		}
		}>
			View UI
		</Button>
		<Table/>
		<ViewLibModal
			isOpen={isOpenViewModal}
			onCancel={() => {
				setIsOpenViewModal(false);
			}}
		/>
	</div>;
}

export default ManageLibs;
