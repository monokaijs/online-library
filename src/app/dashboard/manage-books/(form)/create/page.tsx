import BookForm from "../components/BookForm";
import {FormAction} from "@/constants/app.constant";

export default function CreateBookCasePage() {
  return <BookForm action={FormAction.CREATE}/>;
}
