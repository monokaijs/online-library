import DashboardLayoutContent from "@/app/dashboard/DashboardLayoutContent";
import SessionProvider from "@/components/shared/SessionContext";
import { getSession } from "@/lib/utils/getSession";
import { ConfigProvider } from "antd";

export default async function DashboardLayout( {children}: any ) {
	const session = await getSession();
	console.log('session', session);
	return <SessionProvider session={session}>
		<ConfigProvider
			theme={{
				components: {
					Input: {
						borderRadius: 2
					},
					DatePicker: {
						borderRadius: 2
					},
					Modal: {
						borderRadiusLG: 4
					}
				}
			}}>
			<DashboardLayoutContent>
				{children}
			</DashboardLayoutContent>
		</ConfigProvider>
	</SessionProvider>;
}
