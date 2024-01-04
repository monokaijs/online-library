import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {useRouter} from "next/router";
import {ReactElement, ReactNode, useEffect, useState} from "react";
import {NextPage} from "next";
import NProgress from 'nprogress';
import ThemeProvider from "@/components/providers/ThemeProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, [router.events]);

  return <ThemeProvider>
    {getLayout(<Component {...pageProps} />)}
  </ThemeProvider>

}
