import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { Lexend_Deca } from "next/font/google";

interface ThemeProviderProps {
	children: ReactNode;
}

const lexendDeca = Lexend_Deca({
	weight: ['300', '400', '500', '600'],
	subsets: ['latin'],
});

export default function ThemeProvider( {children}: ThemeProviderProps ) {
	return <ConfigProvider
		theme={{
			token: {
				colorPrimary: '#006D75',
				fontFamily: lexendDeca.style.fontFamily,
				colorText: '#000e1d',
				colorLink: '#006D75',
			},
			components: {
				Card: {
					paddingLG: 20,
					borderRadiusLG: 0,
					boxShadowCard: 'none'
				},
				Button: {
					borderRadius: 2,
					primaryShadow: 'none'
				}
			}
		}}
	>
		{children}
	</ConfigProvider>;
}
