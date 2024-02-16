import LoginPageContent from "@/app/auth/login/LoginPageContent";
import styles from "./page.module.scss";

export default function Login() {
  return <div className={styles.loginPage}>
    <LoginPageContent/>
  </div>
}
