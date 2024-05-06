import { FormAction } from "@/constants/app.constant";
import { libraryService } from "@/lib/services/library.service";
import BookcaseForm from "../components/BookcaseForm";
import { dbService } from "@/lib/services/db.service";

export default async function CreateBookCasePage() {
  await dbService.connect();
  const libraries = await libraryService.get();
  return <BookcaseForm libraries={libraries} action={FormAction.CREATE} />;
}
