"use client";
import { Button, Input } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

function ManageAccountsHeader() {
	const router = useRouter();
	return <div className={'flex justify-between mb-4'}>
		<div className={'flex gap-8'}>
			<Input
				placeholder={'Tìm kiếm bạn đọc...'}
				addonAfter={<SearchOutlined/>}
			/>
			<Input
				placeholder={'Tìm kiếm theo tên...'}
				addonAfter={<DownOutlined/>}
			/>
		</div>
		<Button type={'primary'} onClick={() => {
			router.push('/dashboard/manage-accounts/create');
		}}>
			Thêm bạn đọc
		</Button>
	</div>;
}

export default ManageAccountsHeader;
;
