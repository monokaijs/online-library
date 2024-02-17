import { ReactNode } from "react";

interface ManageLibsLayoutProps {
	children: ReactNode;
}

function ManageLibsLayout( props: ManageLibsLayoutProps ) {
	return <div>
		{props?.children}
	</div>;
}

export default ManageLibsLayout;
