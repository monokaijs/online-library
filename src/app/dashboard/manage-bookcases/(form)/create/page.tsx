import BookcaseForm from "../components/BookcaseForm";
import {FormAction} from "@/constants/app.constant";

export default function CreateBookCasePage() {
  return <BookcaseForm action={FormAction.CREATE}/>;
}
