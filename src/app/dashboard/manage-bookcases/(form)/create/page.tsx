import { FormAction } from "@/constants/app.constant";
import BookcaseForm from "../components/BookcaseForm";
import {Suspense} from "react";

export default async function CreateBookCasePage() {
  return <Suspense>
    <BookcaseForm action={FormAction.CREATE} />
  </Suspense>;
}
