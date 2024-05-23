import GoogleConnectButton from "@/app/dashboard/security/connect-account/components/GoogleConnectButton";
import { appEnv } from "@/lib/configs/env";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Card } from "antd";

export default function ConnectAccount() {
  const redirectUri = appEnv.security.google.redirectURI;

  return (
    <div className={"mt-4"}>
      <Card>
        <GoogleOAuthProvider clientId={appEnv.security.google.clientId}>
          <GoogleConnectButton/>
        </GoogleOAuthProvider>
      </Card>
    </div>
  );
}
