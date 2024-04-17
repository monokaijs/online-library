import LoginPageContent from "@/app/auth/login/LoginPageContent";
import styles from "./page.module.scss";
import { appEnv } from "@/lib/configs/env";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <GoogleOAuthProvider clientId={appEnv.security.google.clientId}>
        <LoginPageContent redirectUri={appEnv.security.google.redirectURI} />
      </GoogleOAuthProvider>
    </div>
  );
}
