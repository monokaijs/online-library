import {ConfigProvider} from "antd";
import {ReactNode} from "react";
import {Lexend_Deca} from "next/font/google";

interface ThemeProviderProps {
  children: ReactNode;
}

const lexendDeca = Lexend_Deca({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
})

export default function ThemeProvider({children}: ThemeProviderProps) {
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1349FF',
        fontFamily: lexendDeca.style.fontFamily,
        colorText: '#01002E',
        colorLink: '#1349FF',
      }
    }}
  >
    {children}
  </ConfigProvider>
}