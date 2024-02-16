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
        colorPrimary: '#006D75',
        colorLink: '#006D75',
      }
    }}
  >
    {children}
  </ConfigProvider>
}
