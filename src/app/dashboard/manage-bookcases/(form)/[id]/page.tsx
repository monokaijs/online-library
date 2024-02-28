import {FormAction} from "@/constants/app.constant";
import BookcaseForm from "../components/BookcaseForm";

export default function UpdateBookcasePage() {
  return <BookcaseForm action={FormAction.UPDATE}/>;
}
