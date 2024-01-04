import {ConfigProvider} from "antd";
import {ReactNode} from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({children}: ThemeProviderProps) {
  return <ConfigProvider>
    {children}
  </ConfigProvider>
}