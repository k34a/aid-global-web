import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { ngoConfig } from '../../config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: ngoConfig.name,
    template: `%s | ${ngoConfig.name}`
  },
  description: ngoConfig.description,
  keywords: [
    'NGO',
    'non-profit',
    'charity',
    'humanitarian',
    'aid',
    'global foundation',
    'donations',
    'volunteer'
  ],
  authors: [{ name: ngoConfig.name }],
  creator: ngoConfig.name,
  publisher: ngoConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: ngoConfig.contact.website,
    title: ngoConfig.name,
    description: ngoConfig.description,
    siteName: ngoConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: ngoConfig.name,
    description: ngoConfig.description,
    creator: '@aidglobal', // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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