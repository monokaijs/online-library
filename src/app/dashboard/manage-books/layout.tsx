import { ReactNode } from "react";

interface ManageBookLayoutProps {
  children: ReactNode;
}

function ManageBookLayout(props: ManageBookLayoutProps) {
  return <div className="h-full">{props?.children}</div>;
}

export default ManageBookLayout;
