import styles from "./page.module.css";
import {redirect} from "next/navigation";
import mailingService from "@/lib/services/mailing.service";


export default async function Home() {
  return redirect('/dashboard');
}
