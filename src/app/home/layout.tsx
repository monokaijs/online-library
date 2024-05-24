import {ConfigProvider} from "antd";
import LandingPageFooter from "@/app/home/components/LandingPageFooter";
import Header from "@/app/home/components/Header";
import MobileHeader from "@/app/home/components/MobileHeader";

export default async function DashboardLayout({children}: any) {
  return (
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
      <LandingPageFooter/>
    </ConfigProvider>
  )
}