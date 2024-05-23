import { FormAction } from "@/constants/app.constant";
import BookcaseForm from "../components/BookcaseForm";

export default async function CreateBookCasePage() {
  return <BookcaseForm action={FormAction.CREATE} />;
}
