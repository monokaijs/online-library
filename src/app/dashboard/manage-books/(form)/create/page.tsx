import BookForm from "../components/BookForm";
import {FormAction} from "@/constants/app.constant";
import {Suspense} from "react";

export default function CreateBookCasePage() {
  return <Suspense>
    <BookForm action={FormAction.CREATE}/>
  </Suspense>;
}
