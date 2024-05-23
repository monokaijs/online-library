"use client";
import {usePathname} from "next/navigation";
import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";
import {Suspense} from "react";

function NotFoundPageContent() {
  const pathname = usePathname();
  let Layout = ({children}: any) => <>{children}</>
  if (pathname.startsWith('/dashboard')) Layout = DashboardLayoutContent;
  return <Layout>
    What are you looking for?
  </Layout>
}

export default function NotFound() {
  return <Suspense>
    <NotFoundPageContent/>
  </Suspense>
}
