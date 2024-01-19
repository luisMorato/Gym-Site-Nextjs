import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3CCGYM - Gym Center',
  description: 'Gym Site',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Gluten:wght@200&family=Goblin+One&family=Inter:wght@300&family=Kaisei+Decol&display=swap" rel="stylesheet"/>
      <link rel="shortcut icon" href="Logo.ico" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
          <Header />
            {children}
          <Footer />
      </body>
    </html>
  )
}
