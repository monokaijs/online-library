
import { ReactNode } from "react";

interface ManageAccountsLayoutProps {
	children: ReactNode;
}

function ManageAccountsLayout( props: ManageAccountsLayoutProps ) {
	return <div>{props?.children}</div>;
}

export default ManageAccountsLayout;
