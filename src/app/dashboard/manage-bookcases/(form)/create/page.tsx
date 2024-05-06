import { FormAction } from "@/constants/app.constant";
import { libraryService } from "@/lib/services/library.service";
import BookcaseForm from "../components/BookcaseForm";

export default async function CreateBookCasePage() {
  const libraries = await libraryService.get();
  return <BookcaseForm libraries={libraries} action={FormAction.CREATE} />;
}
