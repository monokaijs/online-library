import { ReactNode } from "react";

interface ManageAccountsLayoutProps {
  children: ReactNode;
}

function ManageAccountsLayout(props: ManageAccountsLayoutProps) {
  return props?.children;
}

export default ManageAccountsLayout;
