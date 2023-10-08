import { Metadata } from 'next';
import ContextApolloProvider from './context/ApolloContext';
import './globals.css';

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'CRM - Customer Administration',
  description: 'CRM App to manage a company product orders, sellers and clients'
}

export default function RootLayout({ children } : { children: React.ReactNode }) {

  return (
    <ContextApolloProvider>
      <html lang="en">
        <body>
          <main>
            {children}
          </main>
        </body>
      </html>
    </ContextApolloProvider>
  )
}