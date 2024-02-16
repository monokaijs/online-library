import { ReactNode } from "react";
import ManageLibsHeader from "@/app/dashboard/manage-libs/components/ManageLibsHeader";

interface ManageLibsLayoutProps {
	children: ReactNode;
}

function ManageLibsLayout( props: ManageLibsLayoutProps ) {
	return <div>
		<ManageLibsHeader/>
		{props?.children}</div>;
}

export default ManageLibsLayout;
