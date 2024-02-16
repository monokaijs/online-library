import { Button, Input } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

function ManageLibsHeader() {
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
		<Button type={'primary'}>
			Thêm thư viện
		</Button>
	</div>;
}

export default ManageLibsHeader;
