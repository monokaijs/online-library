import BorrowForm from "../components/BorrowForm";
import {FormAction} from "@/constants/app.constant";

export default function UpdateBorrowPage() {
  return <BorrowForm action={FormAction.UPDATE}/>;
}
