import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "FrancaisPass — Your Key to Canadian Immigration Success",
    template: "%s | FrancaisPass",
  },
  description:
    "The French Immigration Success Platform. Maximize your CRS points with AI-powered TEF/TCF exam preparation. Get PR approval faster with the largest library of realistic mock exams.",
  keywords: [
    "TEF Canada practice test",
    "TCF Canada preparation",
    "French exam Canada",
    "CLB French preparation",
    "CRS points French",
    "Express Entry French",
    "TEF mock test",
    "TCF mock test",
    "French immigration Canada",
    "FrancaisPass",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "FrancaisPass",
    title: "FrancaisPass — CRS Points & PR Approval",
    description:
      "You're not buying French lessons. You're buying extra CRS points, PR approval, and a better future in Canada.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}