import { ReactNode } from "react";
import { Card } from "antd";
import styles from './layout.module.scss';

interface AccountFormLayoutProps {
	children: ReactNode;
}

export default function AccountFormLayout( props: AccountFormLayoutProps ) {
	return <Card className={styles.wrapper} bordered={false} style={{margin: "0 auto"}}>
		{props?.children}
	</Card>;
}
