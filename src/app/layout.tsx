import "./global.css";
import {ReactNode} from "react";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <body>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </body>
    </html>
  );
}
