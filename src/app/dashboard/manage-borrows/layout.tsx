import { ReactNode } from "react";

interface ManageBorrowsLayoutProps {
  children: ReactNode;
}

function ManageBorrowsLayout(props: ManageBorrowsLayoutProps) {
  return <div className="h-full">{props?.children}</div>;
}

export default ManageBorrowsLayout;
