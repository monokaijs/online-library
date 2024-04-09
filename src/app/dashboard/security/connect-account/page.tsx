import {Button, Card} from "antd";
import {GoogleOutlined} from "@ant-design/icons";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {appEnv} from "@/lib/configs/env";

export default function ConnectAccount() {
  return <div className={'mt-4'}>
    <Card>
      <GoogleOAuthProvider clientId={appEnv.security.google.clientId}>
        <Button shape={'round'}>
          <GoogleOutlined/>
          Connect with Google
        </Button>
      </GoogleOAuthProvider>
    </Card>
  </div>
}
