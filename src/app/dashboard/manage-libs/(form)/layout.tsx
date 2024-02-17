import { ReactNode } from "react";
import { Card } from "antd";
import styles from './layout.module.scss';

interface LibFormLayoutProps {
	children: ReactNode;
}

export default function LibFormLayout( props: LibFormLayoutProps ) {
	return <Card className={styles.wrapper} bordered={false} style={{margin: "0 auto"}}>
		{props?.children}
	</Card>;
}
