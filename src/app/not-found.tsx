"use client";
import {usePathname} from "next/navigation";
import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";

export default function NotFoundPage() {
  const pathname = usePathname();
  let Layout = ({children}: any) => <>{children}</>
  if (pathname.startsWith('/dashboard')) Layout = DashboardLayoutContent;
  return <Layout>
    What are you looking for?
  </Layout>
}
