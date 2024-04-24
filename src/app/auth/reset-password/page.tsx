import ResetPageContent from "@/app/auth/reset-password/ResetPageContent";
import styles from "./page.module.scss";
import { appEnv } from "@/lib/configs/env";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ResetPassword() {
  return (
    <div className={styles.loginPage}>
      <GoogleOAuthProvider clientId={appEnv.security.google.clientId}>
        <ResetPageContent redirectUri={appEnv.security.google.redirectURI} />
      </GoogleOAuthProvider>
    </div>
  );
}
