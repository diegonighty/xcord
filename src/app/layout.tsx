import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from './components/ui/navbar'
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'XCord - La Red Social más fachera facherita 😎',
  description: 'La red social más fachera facherita 😎',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#111827] text-white`}>
      <AuthProvider>
        <header className='py-10'>
          <NavBar />
        </header>
        <main className='flex justify-center items-center'>
          {children}
        </main>
        <footer className={'pt-10 flex justify-center items-center'}>
          when impostor is sus ඞ
        </footer>
      </AuthProvider>
      </body>
    </html>
  )
}
