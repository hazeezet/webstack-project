"use client";

import { ThemeProvider } from "next-themes";


export default function Themes({ children }: { children: React.ReactNode;})
{
	return(
		<ThemeProvider enableSystem={false} enableColorScheme={true} defaultTheme={"dark"}>
			{children}
		</ThemeProvider>
	)
}
