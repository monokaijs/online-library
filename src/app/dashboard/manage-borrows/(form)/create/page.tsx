import { Card } from "antd";
import BorrowForm from "../components/BorrowForm";
import { FormAction } from "@/constants/app.constant";

export default function CreateBorrowPage() {
  return <BorrowForm action={FormAction.CREATE} />;
}
