"use client";

import {
  googleConnectAction,
  googleDisconnectAction,
} from "@/app/dashboard/security/actions";
import { SessionContext } from "@/components/shared/SessionContext";
import { useDidMountEffect } from "@/lib/hooks/useDidMountEffect";
import { toast } from "@/lib/utils/toast";
import { GoogleOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import { useContext, useState } from "react";
import { useFormState } from "react-dom";

export default function GoogleConnectButton({
  redirectUri,
}: {
  redirectUri: string;
}) {
  const { account } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [state, gConnectAction] = useFormState(googleConnectAction, {
    message: "",
    success: false,
  });

  const [stateDisconect, gDisconnectAction] = useFormState(
    googleDisconnectAction,
    {
      message: "",
      success: false,
    }
  );

  useDidMountEffect(() => {
    setLoading(false);
    toast(state);
  }, [state]);

  useDidMountEffect(() => {
    setLoading(false);
    toast(stateDisconect);
  }, [stateDisconect]);

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => gConnectAction({ code: code, type: "google" }),
    onNonOAuthError: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
    redirect_uri: redirectUri,
  });

  const handleGoogleAction = () => {
    setLoading(true);
    account?.googleId ? gDisconnectAction() : login();
  };

  return (
    <Button
      shape={"round"}
      onClick={handleGoogleAction}
      type={account?.googleId ? "primary" : "dashed"}
      loading={loading}
    >
      <GoogleOutlined />
      {account?.googleId ? "Disconect from" : "Connect with"} Google
    </Button>
  );
}
