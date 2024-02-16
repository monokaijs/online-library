import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";
import SessionProvider from "@/components/shared/SessionContext";
import {getSession} from "@/lib/utils/getSession";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: any) {
  const session = await getSession();
  if (!session.signedIn) return redirect('/auth/login');
  return <SessionProvider session={{
    signedIn: session.signedIn,
    account: session.account,
  }}>
    <DashboardLayoutContent>
      {children}
    </DashboardLayoutContent>
  </SessionProvider>
}
