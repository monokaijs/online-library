import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";
import SessionProvider from "@/components/shared/SessionContext";
import {getSession} from "@/lib/utils/getSession";

export default async function DashboardLayout({children}: any) {
  const session = await getSession();
  console.log('session', session);
  return <SessionProvider session={session}>
    <DashboardLayoutContent>
    {children}
  </DashboardLayoutContent>
  </SessionProvider>
}
