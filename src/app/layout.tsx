import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Themes from '@palette/theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Palette assessment',
    description: 'Enjoy your board',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={`${inter.className} min-h-screen w-full overflow-x-hidden transition-all duration-700 bg-gradient-to-bl dark:bg-red-500 from-[#ffdbd7] dark:from-[#035050] to-[#c1dcff] dark:to-[#021323]`}>
                <Themes>
                    {children}
                </Themes>
            </body>
        </html>
    )
}
