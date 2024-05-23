import { FormAction } from "@/constants/app.constant";
import LocationForm from "../components/LocationForm";

export default async function CreateBookCasePage() {
  return <LocationForm action={FormAction.CREATE} />;
}
