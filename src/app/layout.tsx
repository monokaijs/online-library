import "./global.css";
import {ReactNode} from "react";
import ThemeProvider from "@/components/providers/ThemeProvider";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import 'antd-css-utilities/utility.min.css';
import LoadingProvider from "@/components/providers/LoadingProvider";

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <body>
      <AntdRegistry>
        <ThemeProvider>
          <LoadingProvider/>
          {children}
        </ThemeProvider>
      </AntdRegistry>
    </body>
    </html>
  );
}
