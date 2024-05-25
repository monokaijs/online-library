import {ConfigProvider} from "antd";
import Header from "./Header";
import MobileHeader from "./MobileHeader";
import Footer from "./Footer";
import {getSession} from "@/lib/utils/getSession";
import SessionProvider from "@/components/shared/SessionContext";

export default async function LandingPageLayout({children}: any) {
  const session = await getSession();

  return (
    <div style={{overflowX: "hidden"}}>
      <SessionProvider session={{
        signedIn: session.signedIn,
        account: session.account,
      }}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4A6F73',
              colorText: '#717171',
              colorLink: '#006D75',
              colorTextHeading: "#4D4D4D",
              fontSize: 14,
            },
            components: {
              Typography: {
                titleMarginBottom: 0,
                titleMarginTop: 0,
                fontWeightStrong: 600,
                fontSizeHeading1: 36
              },
              Input: {
                colorBgContainer: "#eee"
              },
              Rate: {
                colorFillContent: "#DEDEDE",
              }
            }
          }}>
          <div className="visible lg-hidden">
            <Header/>
          </div>
          <div className="lg-visible hidden">
            <MobileHeader/>
          </div>
          {children}
          <Footer/>
        </ConfigProvider>
      </SessionProvider>

    </div>
  )
}
