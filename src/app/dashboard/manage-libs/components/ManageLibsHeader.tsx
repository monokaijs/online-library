"use client";
import { Button, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import {useRouter} from "next/navigation";


function ManageLibsHeader() {
	const router = useRouter();
	return <div className={'flex justify-between mb-4'}>
		<div className={'flex gap-8'}>
			<Input
				placeholder={'Tìm kiếm tên thư viện...'}
				addonAfter={<SearchOutlined/>}
			/>
			<Input
				placeholder={'Lọc theo thành phố...'}
				addonAfter={<FilterOutlined/>}
			/>
		</div>
		<Button type={'primary'} onClick={() => {
			router.push('/dashboard/manage-libs/create')
		}}>
			Thêm thư viện
		</Button>
	</div>;
}

export default ManageLibsHeader;
;
