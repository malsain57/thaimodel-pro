import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ThaiModel.com',
  description: 'Profile visibility platform for independent models and companions in Thailand.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
