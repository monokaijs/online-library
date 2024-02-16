import {ReactNode} from "react";
import AuthLayoutContent from "@/app/AuthLayoutContent";
import {getSession} from "@/lib/utils/getSession";
import {redirect} from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}
export default async function AuthLayout({children}: AuthLayoutProps) {
  const session = await getSession();
  if (session.signedIn) {
    return redirect('/');
  }

  return <AuthLayoutContent>
    {children}
  </AuthLayoutContent>
}
