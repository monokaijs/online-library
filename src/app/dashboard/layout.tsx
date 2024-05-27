import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";
import SessionProvider from "@/components/shared/SessionContext";
import {getSession} from "@/lib/utils/getSession";
import {ConfigProvider} from "antd";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: any) {
  const session = await getSession();
  if (!session.signedIn) return redirect('/auth/login');

  return (
    <div style={{height: "100vh", overflowX: "hidden"}}>
      <SessionProvider session={{
        signedIn: session.signedIn,
        account: session.account,
      }}>
        <ConfigProvider
          theme={{
            components: {
              Input: {},
              DatePicker: {},
              Layout: {
                triggerBg: "#F3F3F3"
              }
            }
          }}>
          <DashboardLayoutContent>
            {children}
          </DashboardLayoutContent>
        </ConfigProvider>
      </SessionProvider>
    </div>
  )
}
