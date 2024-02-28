import { ReactNode } from "react";

interface ManageBorrowsLayoutProps {
	children: ReactNode;
}

function ManageBorrowsLayout( props: ManageBorrowsLayoutProps ) {
	return <div>
		{props?.children}
	</div>;
}

export default ManageBorrowsLayout;
