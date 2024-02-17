import LibForm from "@/app/dashboard/manage-libs/(form)/components/LibForm";
import { Card } from "antd";

export default function CreateLibPage() {
	return <Card bordered={false} style={{
		maxWidth: 714,
		margin: "0 auto"
	}}><LibForm/></Card>;
}
