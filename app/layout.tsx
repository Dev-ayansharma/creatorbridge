import type React from "react"
import type { Metadata } from "next"
import { Manrope, Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/AuthContext"
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-cal-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CreatorBridge - A Creators Platform",
  description: "The modern platform for editors and youtube owners.",
    generator: 'ayansharma.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        <AuthProvider>
        {children}
        <Toaster/>
        <Analytics />
</AuthProvider>
      </body>
    </html>
  )
}
