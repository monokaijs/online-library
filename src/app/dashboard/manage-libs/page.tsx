"use client";
import { Button, Table } from "antd";
import ManageLibsHeader from "@/app/dashboard/manage-libs/components/ManageLibsHeader";
import Index from "@/app/dashboard/manage-libs/components/ViewLibModal";
import { useState } from "react";

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
		<Index
			isOpen={isOpenViewModal}
			onCancel={() => {
				setIsOpenViewModal(false);
			}}
		/>
	</div>;
}

export default ManageLibs;
