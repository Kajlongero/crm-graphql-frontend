import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRM - Customer Administration',
  description: 'CRM App to manage a company product orders, sellers and clients'
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}