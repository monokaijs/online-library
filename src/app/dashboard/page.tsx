import {getSession} from "@/lib/utils/getSession";
import {redirect} from "next/navigation";
import {Card, Col, DatePicker, Layout, Menu, Row} from "antd";
import DashboardPageContent from "@/app/dashboard/DashboardPageContent";

export default async function DashboardMain() {
  const session = await getSession();
  if (!session.signedIn) return redirect('/auth/login'); // when not signed in, redirect to authentication page
  return <Layout>
    <DashboardPageContent/>
  </Layout>
}
