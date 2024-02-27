import { ReactNode } from "react";

interface ManageBookshelfLayoutProps {
	children: ReactNode;
}

function ManageBookshelfLayout( props: ManageBookshelfLayoutProps ) {
	return <div>
		{props?.children}
	</div>;
}

export default ManageBookshelfLayout;
