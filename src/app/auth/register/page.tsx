import RegisterPageContent from "@/app/auth/register/RegisterPageContent";
import styles from "./page.module.scss";
import {Suspense} from "react";


export default function Register() {
  return <div className={styles.registerPage}>
    <Suspense>
      <RegisterPageContent/>
    </Suspense>
  </div>
}
