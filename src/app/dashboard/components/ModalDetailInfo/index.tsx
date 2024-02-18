import { ReactNode } from "react";
import { Typography } from "antd";
import styles from './ModalDetail.module.scss';

interface Record {
	icon?: ReactNode;
	fieldName: string;
	value: string;
}

interface ModalDetailInfoProps {
	title?: string;
	records: Record[];
}

export default function ModalDetailInfo( props: ModalDetailInfoProps ) {
	const {title, records} = props;
	return <div className={styles.detail}>
		<Typography className={styles.title}>
			{title || 'Thông tin chi tiết'}
		</Typography>
		<div className={'flex flex-col gap-4'}>
			{Array.isArray(records) && records.map(( record ) => {
				let Icon;
				if (record?.icon) {
					Icon = () => record.icon;
				}
				return (
					<div className={'flex'}>
						<div className={styles.label}>
							{record?.icon && <Icon/>}
							<Typography>
								{record?.fieldName}
							</Typography>
						</div>
						<Typography.Text ellipsis={true} className={styles.value}>
							{record?.value}
						</Typography.Text>
					</div>
				);
			})}
		</div>
	</div>;
}
