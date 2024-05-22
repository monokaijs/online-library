import "./global.css";
import "./customize-antd.scss";
import {ReactNode} from "react";
import ThemeProvider from "@/components/providers/ThemeProvider";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import 'antd-css-utilities/utility.min.css';
import LoadingProvider from "@/components/providers/LoadingProvider";
import {Lexend_Deca} from "next/font/google";

const lexendDeca = Lexend_Deca({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

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
