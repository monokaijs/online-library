import { ReactNode } from "react";
import {theme, Typography} from "antd";
import styles from './ModalDetail.module.scss';

interface Record {
	icon?: ReactNode;
	fieldName: string;
	value: string | ReactNode;
}

interface ModalDetailInfoProps {
	title?: string;
	records: Record[];
}

export default function ModalDetailInfo( props: ModalDetailInfoProps ) {
	const {title, records} = props;
	const {token: {colorPrimary}} = theme.useToken();
	return <div className={styles.detail}>
		<Typography className={styles.title}>
			{title || 'Thông tin chi tiết'}
		</Typography>
		<div className={'flex flex-col gap-4'}>
			{Array.isArray(records) && records.map(( record ) => {
				return (
					<div className={styles.record}>
						<div className={styles.label} >
							<Typography.Text style={{color: colorPrimary}}>{record?.icon}</Typography.Text>
							<Typography.Text style={{color: colorPrimary}}>
								{record?.fieldName}
							</Typography.Text>
						</div>
						<div>
							{record?.value}
						</div>
					</div>
				);
			})}
		</div>
	</div>;
}
