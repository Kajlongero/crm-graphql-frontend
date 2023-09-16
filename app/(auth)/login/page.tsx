import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Login',
  description: 'CRM Login page',
}

export default function LoginPage() {
  return (
    <section>
      <h1 className="text-center text-2xl font-light">Login</h1>
    </section>
  )
}