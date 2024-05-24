import "./global.css";
import "./customize-antd.scss";
import {ReactNode} from "react";
import ThemeProvider from "@/components/providers/ThemeProvider";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import "antd-css-utilities/utility.min.css";
import LoadingProvider from "@/components/providers/LoadingProvider";
import {Lexend_Deca} from "next/font/google";
import {Metadata} from "next";

const lexendDeca = Lexend_Deca({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "D Free Book",
  description: "D Free Book là một thư viện cộng đồng cho mượn sách miễn phí và đặt cọc niềm tin. Chúng mình có cơ sở Đại La và cơ sở Cầu Giấy, cả hai đều gần các trường đại học lớn. Bạn đọc của thư viện phần lớn là sinh viên, ngoài ra có người đi làm và học sinh.",
  icons: {
    icon: ""
  }
}

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <body className={lexendDeca.className}>
    <div style={{overflowX: "hidden"}}>
      <AntdRegistry>
        <ThemeProvider>
          <LoadingProvider/>
          {children}
        </ThemeProvider>
      </AntdRegistry>
    </div>
    </body>
    </html>
  );
}
