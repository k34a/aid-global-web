import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/(static)/globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ngoDetails } from '@/config/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(ngoDetails.contact.website!),
  title: {
    default: ngoDetails.name,
    template: `%s | ${ngoDetails.name}`
  },
  description: ngoDetails.description,
  keywords: ngoDetails.keywords,
  authors: [{ name: ngoDetails.name }],
  creator: ngoDetails.name,
  publisher: ngoDetails.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: ngoDetails.contact.website,
    title: ngoDetails.name,
    description: ngoDetails.description,
    siteName: ngoDetails.name,
  },
  twitter: {
    card: ngoDetails.twitterCardType,
    title: ngoDetails.name,
    description: ngoDetails.description,
    creator: ngoDetails.twitterHandle, 
  },

}

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}