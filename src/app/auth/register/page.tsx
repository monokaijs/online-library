import RegisterPageContent from "@/app/auth/register/RegisterPageContent";
import styles from "./page.module.scss";

export default function Register() {
  return <div className={styles.registerPage}>
    <RegisterPageContent/>
  </div>
}
